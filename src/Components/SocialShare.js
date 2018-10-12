import React, { Component } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon,
  TwitterIcon
} from "react-share";
import "./Custom.css";


class SocialShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: ""
    };

    this.state.link = this.props.link;
  }
  render() {
    return (
      <div class="row">
        <div class="col-3" />
        <div className="col-2 Demo__some-network">
          <FacebookShareButton
            url={this.state.link}
            quote="Hey How much you know me I challenge you! Play Now.."
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={50} round />
          </FacebookShareButton>
        </div>

        <div className="col-2 Demo__some-network">
          <WhatsappShareButton
            url={this.state.link}
            title="Hey How much you know me I challenge you! Play Now.."
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={50} round />
          </WhatsappShareButton>
        </div>

        <div className="col-2 Demo__some-network">
          <TwitterShareButton
            url={this.state.link}
            title="Hey How much you know me I challenge you! Play Now.."
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={50} round />
          </TwitterShareButton>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default SocialShare;
