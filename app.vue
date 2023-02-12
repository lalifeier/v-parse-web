<script setup>

const route = useRoute()
const url = route.query.url

let option = {
  muted: false,
  autoplay: true,
  pip: true,
  // autoSize: true,
  autoMini: true,
  // screenshot: true,
  setting: true,
  loop: true,
  playbackRate: true,
  aspectRatio: true,
  fullscreen: true,
  fullscreenWeb: true,
  miniProgressBar: true,
  mutex: true,
  backdrop: true,
  playsInline: true,
  autoPlayback: true,
  airplay: true,
  theme: '#23ade5',
  // useSSR: true,
}

const getOption = async (url) => {
  if (!url)
    return {}

  if (url.includes('.mp4')
    || url.includes('.m3u8')
    || url.includes('.flv'))
    return { url }

  const { data } = await useFetch('http://localhost:8080/api/v1/parse', {
    params: { url },
    // server: false
    // pick: []
  })

  // console.log(data.value)

  const { live: isLive, streams, thumbnail } = data.value || {}

  if (!streams) {
    return {}
  }

  const getQuality = (streams) => {
    const qualityList = []

    for (const key in streams) {
      const { ext, src, video_profile } = streams[key]
      qualityList.push({
        html: video_profile,
        url: src[0],
        ext,
      })
    }
    return qualityList
  }
  const quality = getQuality(streams)

  if (quality.length == 0) {
    return {}
  }
  if (quality.length == 1) {
    return {
      isLive,
      url: quality[0].url,
      type: quality[0].ext,
    }
  }

  return {
    isLive,
    url: quality[0].url,
    type: quality[0].ext,
    quality,
  }
}

option = Object.assign(option, await getOption(url))

const style = {
  width: '100vw',
  height: '100vh',
}

const getInstance = (art) => {
  // console.log(art)
}
</script>

<template>
  <Artplayer :option="option" :style="style" @get-instance="getInstance" />
</template>
