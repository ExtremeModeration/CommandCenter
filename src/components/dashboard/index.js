import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'react-flexbox-grid'
import { fetchStream } from 'reducers/stream'
import { fetchFollows } from 'reducers/follows'
import { fetchChatters } from 'reducers/chatters'

import ChatWidget from './ChatWidget'
import Followers from './Followers'
import Info from './Info'
import Chatters from './Chatters'

class Dashboard extends Component {
  componentWillMount() {
    // todo: get this from some settings state...
    const channel = 'ExtremeModeration'
    const channel_id = 76866729

    this.fetchStream(channel_id)

    setTimeout(() => (
      this.fetchFollows(channel_id)
    ), 1000)

    setTimeout(() => (
      this.fetchChatters(channel)
    ), 500)
  }

  componentWillUnmount() {
    [
      this.streamInterval,
      this.followersInterval,
      this.viewersInterval
    ].map(interval =>(
      clearInterval(interval)
    ))
  }

  fetchStream = (channel) => {
    this.props.fetchStream(channel)
    // is this really the right place to do this?
    // get the stream info every minute
    this.streamInterval = setTimeout(() => (
      this.fetchStream(channel)
    ), 60000)
  }

  fetchFollows = (channel) => {
    this.props.fetchFollows(channel)
    this.followersInterval = setTimeout(() => (
      this.fetchFollows(channel)
    ), 60000)
  }

  fetchChatters = (channel) => {
    this.props.fetchChatters(channel)
    this.viewersInterval = setTimeout(() => (
      this.fetchChatters(channel)
    ), 10000)
  }

  render() {
    const { followers, stream, chatters } = this.props
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

              <Col xs={6}>
                <Chatters {...chatters} />
              </Col>
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
  ({stream, follows, chatters}) => ({
    stream,
    chatters,
    followers: follows.users
  }),
  { fetchStream, fetchFollows, fetchChatters }
)(Dashboard)
