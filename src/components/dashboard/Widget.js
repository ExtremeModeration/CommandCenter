import React from 'react'
import { Card, CardHeader } from 'material-ui'

import style from './Widget.styl'

const Widget = (props) => (
  <div className={style.widget}>
    <Card>
      <CardHeader
        title={props.title}
        subtitle={props.subtitle}
        showExpandableButton={false} />
      {props.children}
    </Card>
  </div>
)

export default Widget
