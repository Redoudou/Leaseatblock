import React from 'react'

class ErrorBoundary extends React.Component {
  state = {
    error: null,
  }

  componentDidCatch(error, info) {
    this.setState({ error })
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    return this.props.children
  }
}

export default ErrorBoundary