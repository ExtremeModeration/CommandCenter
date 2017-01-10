import React from 'react'
import { connect } from 'react-redux'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { AppBar } from 'material-ui'
import { Grid } from 'react-flexbox-grid'
import { MainLeftDrawer } from 'components/navigation'
import { openLeftDrawer, closeLeftDrawer } from 'reducers/drawer'

import DefaultTheme from '../../themes/default'
import styles from './style.styl'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    ipcRenderer.send('app-ready')
  }

  render() {
    const { closeLeftDrawer, menuOpen, openLeftDrawer } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(DefaultTheme)}>
        <div>
          <MainLeftDrawer
            open={menuOpen}
            onRequestChange={closeLeftDrawer} />

          <AppBar
            title='Command Center'
            onLeftIconButtonTouchTap={openLeftDrawer}
            className={styles.appBar} />

            <div className={styles.content}>
              <Grid>{this.props.children}</Grid>
            </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(
  state => ({
    menuOpen: state.drawer.menuOpen
  }),
  { openLeftDrawer, closeLeftDrawer }
)(App)
