import React from 'react';
import { any } from 'prop-types';
var adsbygoogle=any;
export default class AdComponent extends React.Component {
  componentDidMount () {
    ((adsbygoogle = (window).adsbygoogle || []).push({}));
}

render () {
    return (
        <ins className="adsbygoogle"
        style={{display:'block'}}
        data-ad-client="ca-pub-23452425"
        data-ad-slot="24524524"
        data-ad-format="auto">
   </ins>
    );
  }
}