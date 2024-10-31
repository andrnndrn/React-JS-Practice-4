import React from "react";
import Markdown from "react-markdown";

export default class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedText: "",
    };
    this.typingSpeed = 20;
    this.index = 0;
    this.intervalId = null;
  }

  componentDidMount() {
    this.startTyping();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.resetTyping();
      this.startTyping();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  resetTyping() {
    this.setState({ displayedText: "" });
    this.index = 0;
  }

  startTyping() {
    const { message } = this.props;

    if (message.length > 0) {
      this.setState({ displayedText: message.charAt(0) });
      this.index = 0;
    }

    this.intervalId = setInterval(() => {
      const { message } = this.props;
      if (this.index < message.length) {
        this.setState((prevState) => ({
          displayedText: prevState.displayedText + message.charAt(this.index),
        }));
        this.index++;
      } else {
        clearInterval(this.intervalId);
      }
    }, this.typingSpeed);
  }

  render() {
    const { query } = this.props;
    const { displayedText } = this.state;

    return (
      <div className="container chat-message-cstm">
        {/* user question */}
        <div className="d-flex justify-content-end mb-3">
          <div className="p-3 border shadow-sm rounded-user-cstm bg-primary-subtle">
            <i className="bi bi-person-circle me-2"></i>
            <strong>Question:</strong> {query}
          </div>
        </div>

        {/* bot response */}
        <div className="d-flex justify-content-start">
          <div className="p-3 border shadow-sm rounded-ai-cstm bg-primary-subtle">
            <i className="bi bi-robot me-2"></i>
            <strong>Answer:</strong>
            <div>
              <Markdown>{displayedText}</Markdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
