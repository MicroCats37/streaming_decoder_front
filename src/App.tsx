"use client"

import type { Component } from "solid-js"
import { createSignal } from "solid-js"
import logo from "./logo.png"
import styles from "./App.module.css"
import HlsPlayer from "./components/HlsPlayer"

const channels = [
  { id: 1, name: "Canal 1", url: "http://10.10.5.57:7000/live/1/playlist.m3u8" },
  { id: 2, name: "Canal 2", url: "http://10.10.5.57:7000/live/2/playlist.m3u8" },
  { id: 3, name: "Canal 3", url: "http://10.10.5.57:7000/live/3/playlist.m3u8" },
  { id: 4, name: "Canal 4", url: "http://10.10.5.57:7000/live/4/playlist.m3u8" },
  { id: 5, name: "Canal 5", url: "http://10.10.5.57:7000/live/5/playlist.m3u8" },
  { id: 6, name: "Canal 6", url: "http://10.10.5.57:7000/live/6/playlist.m3u8" },
  { id: 7, name: "Canal 7", url: "http://10.10.5.57:7000/live/7/playlist.m3u8" },
  { id: 8, name: "Canal 8", url: "http://10.10.5.57:7000/live/8/playlist.m3u8" },
  { id: 9, name: "Canal 9", url: "http://10.10.5.57:7000/live/9/playlist.m3u8" },
  { id: 10, name: "Canal 10", url: "http://10.10.5.57:7000/live/10/playlist.m3u8" },
  { id: 11, name: "Canal 11", url: "http://10.10.5.57:7000/live/11/playlist.m3u8" },
  { id: 12, name: "Canal 12", url: "http://10.10.5.57:7000/live/12/playlist.m3u8" },
  { id: 13, name: "Canal 13", url: "http://10.10.5.57:7000/live/13/playlist.m3u8" },
]

const App: Component = () => {
  const [currentChannel, setCurrentChannel] = createSignal(channels[0])

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div class={styles.topSection}>
          <img src={logo || "/placeholder.svg"} class={styles.logo} alt="logo" />
          <h1 class={styles.title}>CIPLima TV</h1>
        </div>

        <div class={styles.controlSection}>
          <div class={styles.selectorContainer}>
            <label class={styles.selectorLabel}>Seleccionar Canal:</label>
            <select
              class={styles.channelSelector}
              onInput={(e) => {
                const id = Number(e.currentTarget.value)
                const channel = channels.find((c) => c.id === id)
                if (channel) setCurrentChannel(channel)
              }}
            >
              {channels.map((c) => (
                <option value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div class={styles.currentChannelInfo}>
            <span class={styles.nowWatching}>Viendo:</span>
            <span class={styles.channelName}>{currentChannel().name}</span>
          </div>
        </div>

        <div class={styles.videoContainer}>
          <HlsPlayer src={currentChannel().url} autoplay={false} />
        </div>
      </header>
    </div>
  )
}

export default App