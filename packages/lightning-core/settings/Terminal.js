import React, { Component } from 'react';
import { Input } from '../common';
import { ipcRenderer, ipcMain } from 'electron';
import reactCSS from 'reactcss'

export default class Terminal extends Component {
  render() {
    const styles = reactCSS({
      'default': {
        changer: {
          marginTop: 10,
          marginBottom: 10,
          borderLeft: '1px solid #ddd',
          paddingLeft: 15,
          paddingRight: 15,
          display: 'flex',
          alignItems: 'center',
          color: '#999',
        },
      },
    })

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        ipcRenderer.send('terminal-command', e.target.value.split(' '));
        e.target.value = '';
      }

    }
    const changer = (
      <div style={styles.changer}>$ lncli</div>
    )

    return (
      <Input fullWidth
        left={changer}
        onKeyPress={handleKeyPress} />
    )
  }
}
