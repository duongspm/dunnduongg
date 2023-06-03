import React, { Component } from 'react';

class ScrollToTop extends Component {
    state = {
    showScrollButton: false,
};

componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
}

componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
}

handleScroll = () => {
    if (window.pageYOffset > 500) {
    this.setState({ showScrollButton: true });
    } else {
    this.setState({ showScrollButton: false });
    }
};

scrollToTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
};

render() {
    return (
        <div>
            {/* <div className="test"></div> */}

            {this.state.showScrollButton && (
                <button onClick={this.scrollToTop}>Scroll to top</button>
            )}
        </div>
        );
    }
}

export default ScrollToTop;