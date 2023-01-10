<script>
import Artplayer from 'artplayer'


export default {
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  emits: ['getInstance'],
  data() {
    return {
      instance: null,
    }
  },
  mounted() {
    const { $flv } = useNuxtApp()

    this.instance = new Artplayer({
      ...this.option,
      customType: {
        m3u8: async function (video, url) {
          const { default: Hls } = await import('hls.js');
          if (Hls.isSupported()) {
            // if (hls) {
            //       hls.destroy();
            // }
            const hls = new Hls()
            hls.loadSource(url)
            hls.attachMedia(video)
          }
          else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url
          }
          else {
            art.notice.show = '不支持播放格式：m3u8'
          }
        },
        flv: async function (video, url) {
          const { default: flvjs } = await import('flv.js');
          if (flvjs.isSupported()) {
            // if (flvjs) {
            //   flvjs.destroy();
            // }
            const flvPlayer = flvjs.createPlayer({
              type: 'flv',
              url,
            })
            flvPlayer.attachMediaElement(video)
            flvPlayer.load()
          }
          else {
            art.notice.show = '不支持播放格式：flv'
          }
        },
        // mpd: function (video, url) {
        //   var player = dashjs.MediaPlayer().create();
        //   player.initialize(video, url, true);
        // },
      },

      container: this.$refs.artRef,
    })

    this.$nextTick(() => {
      this.$emit('getInstance', this.instance)
    })
  },
  beforeUnmount() {
    if (this.instance && this.instance.destroy)
      this.instance.destroy(false)
  },
}
</script>

<template>
  <div ref="artRef" />
</template>

<style>
/* html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
} */
</style>
