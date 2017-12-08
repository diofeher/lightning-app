import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Terminal from 'react-bash';
import { ipcRenderer, ipcMain } from 'electron';

export default class TerminalAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commandData: '',
      history: [{ value: 'Type `help` to begin' }],
      structure: {
        public: {
          file1: { content: 'The is the content for file1 in the <public> directory.' },
          file2: { content: 'The is the content for file2 in the <public> directory.' },
          file3: { content: 'The is the content for file3 in the <public> directory.' },
        },
        'README.md': { content: 'Some readme' },
      }
    }
  }

  render() {
    const extensions = {
      lncli: {
        exec: (state, { args }) => {
          let { history } = state
          let cmd_args = history[history.length-1].value.split(' ').slice(1)
          ipcRenderer.send('terminal-command', cmd_args);
          console.log(this.state)
          ipcRenderer.on('command-output', (event, arg) => {
            // history.concat({value: arg})
            this.setState({ 
              // history: history.concat({value: arg}),
              commandData: arg
            })
          })
          return {
            history: history.concat({ value: 'Running command...' }),
          };
        }
      }
    }
    return (
      <div className="parentContainer">
        <div style={{ whiteSpace: 'pre' }}>
          <Terminal history={this.state.history} structure={this.state.structure} extensions={extensions} />
        </div>
        <div style={{ flex: 1, whiteSpace: 'pre' }}>
          {this.state.commandData}
        </div>
      </div>
    )
  }
}