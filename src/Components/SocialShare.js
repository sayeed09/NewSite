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
import messenger from "./messenger.png";
class SocialShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: ""
    };

    this.state.link = this.props.link;
    var link=this.state.link;
  }
  render() {
    return (
      <div class="row" >
        <div class="col-2" />
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
        <div className="col-2 Demo__some-network">
        <a href={`fb-messenger://share/?link=${this.state.link}`}>
        <img src={messenger} style={{ height: "54px", width: "53px" }} />
        </a>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default SocialShare;
