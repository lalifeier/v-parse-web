import Artplayer from 'artplayer';
import { Option } from 'artplayer/types/option';
import flvjs from 'flv.js';
import Hls from "hls.js";
import { PropType } from 'vue';
const props = {
  option: {
    type: Object as PropType<Option>,
    required: true,
  },
}

export default defineComponent({
  name: 'Artplayer',
  props,
  emits: ['getInstance'],
  setup(props, { emit }) {
    const elRef = ref<null | HTMLDivElement>(null)
    const instance = ref<null | Artplayer>(null)

    const playM3u8 = async (video: HTMLVideoElement, url: string, art: Artplayer) => {
      // const { default: Hls } = await import('hls.js');
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else {
        art.notice.show = 'Unsupported playback format: m3u8';
      }
    }

    const playFlv = async (video: HTMLVideoElement, url: string, art: Artplayer) => {
      // const { default: Flv } = await import('flv.js');
      if (flvjs.isSupported()) {
        const flv = flvjs.createPlayer({ type: 'flv', url });
        flv.attachMediaElement(video);
        flv.load();
      } else {
        art.notice.show = 'Unsupported playback format: flv';
      }
    }

    const options = computed(() => {
      return {
        ...props.option,
        container: unref(elRef)!,
        customType: {
          m3u8: playM3u8,
          flv: playFlv,
        },
      }
    })

    onMounted(() => {
      instance.value = new Artplayer(unref(options)!);

      nextTick(() => {
        emit('getInstance', unref(instance))
      })
    })

    function destroyArtPlayer() {
      if (unref(instance) && unref(instance)?.destroy) {
        unref(instance)?.destroy(false);
      }
    }

    onBeforeUnmount(() => {
      destroyArtPlayer()
    })

    return () => <div ref={elRef}></div>
  },
})
