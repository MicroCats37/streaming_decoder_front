import { onCleanup, createEffect } from "solid-js"
import Hls from "hls.js"

interface Props {
  src: string
  autoplay?: boolean
}

export default function HlsPlayer(props: Props) {
  let video!: HTMLVideoElement

  createEffect(() => {
    let hls: Hls | null = null

    if (Hls.isSupported()) {
      hls = new Hls()
      hls.loadSource(props.src)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (props.autoplay) {
          video.play().catch((err) => console.warn("Autoplay bloqueado por el navegador:", err))
        }
      })
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = props.src
      if (props.autoplay) {
        video.play().catch((err) => console.warn("Autoplay bloqueado por el navegador:", err))
      }
    }

    onCleanup(() => {
      if (hls) {
        hls.destroy()
        hls = null
      }
    })
  })

  return (
    <video
      ref={video}
      autoplay={props.autoplay}
      controls
      style={{
        width: "100%",
        height: "100%",
        "object-fit": "cover",
        "border-radius": "inherit",
      }}
    />
  )
}
