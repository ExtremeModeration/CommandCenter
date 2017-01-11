import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'react-flexbox-grid'
import { fetchStream } from 'reducers/stream'
import { fetchFollowers } from 'reducers/followers'

import ChatWidget from './ChatWidget'
import Followers from './Followers'
import Info from './Info'
import Viewers from './Viewers'

class Dashboard extends Component {
  componentWillMount() {
    const channel = 'ExtremeModeration'
    // todo: get this from some settings state...
    this.fetchStream(channel)
    setTimeout(() => this.fetchFollowers(channel), 1000)
  }

  fetchStream = (channel) => {
    this.props.fetchStream(channel)
    // is this really the right place to do this?
    // get the stream info every minute
    setTimeout(() => this.fetchStream(channel), 60000)
  }

  fetchFollowers = (channel) => {
    this.props.fetchFollowers(channel)
    setTimeout(() => this.fetchFollowers(channel), 60000)
  }

  render() {
    const { followers, stream } = this.props
    const { game, viewers, channel, online } = stream
    const { status } = channel

    return (
      <div>
        <Row>
          <Col xs={7}>
            <Row>
              <Col xs={12}>
                <Info
                  online={online}
                  title={status}
                  playing={game}
                  viewers={viewers} />
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Followers followers={followers} />
              </Col>

              {/* <Col xs={6}>
                <Viewers viewers={viewers} />
              </Col> */}
            </Row>
          </Col>

          <Col xs={5}>
            <ChatWidget />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  ({stream, followers}) => ({
    stream,
    followers: followers.users
  }),
  { fetchStream, fetchFollowers }
)(Dashboard)
