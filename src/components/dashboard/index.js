import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'react-flexbox-grid'

import Info from './Info'
import Viewers from './Viewers'

class Dashboard extends Component {
  render() {
    const { online, playing, title, viewers } = this.props
    return (
      <div>
        <Row>
          <Col xs={8}>
            <Row>
              <Col xs={12}>
                <Info online={online} title={title} playing={playing} />
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Viewers viewers={viewers} />
              </Col>
            </Row>
          </Col>

          <Col xs={4}>
            Maybe chat?
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  ({stream}) => ({
    viewers: stream.viewers,
    title: stream.title,
    playing: stream.playing,
    online: stream.online
  })
)(Dashboard)
