import React, { Component } from "react";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import Navbar from "../components/Navbar";
import { logout, queryAI } from "../utils/api";
import Loading from "../components/Loading";

export default class ChatContainer extends Component {
  state = {
    messages: [],
    loading: false,
    error: null,
    query: "",
  };

  handleQuery = (e) => {
    e.preventDefault();
    const { query } = this.state;
    this.setState({
      loading: true,
      error: null,
    });

    queryAI({ query }, this.props.token)
      .then((res) => {
        this.setState({
          messages: [...this.state.messages, { query, data: res }],
          query: "",
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleLogout = (e) => {
    e.preventDefault();
    logout(this.props.token)
      .then(() => {
        localStorage.removeItem("token");
        this.props.setToken(null);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <div>
        <Navbar setToken={this.props.setToken} onClick={this.handleLogout} />
        {this.state.loading ? (
          <Loading />
        ) : this.state.messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.data.data}
            query={message.query}
          />
        ))
        }

        <ChatInput
          onSubmit={this.handleQuery}
          onChange={this.handleChange}
          loading={this.state.loading}
          query={this.state.query}
        />
      </div>
    );
  }
}
