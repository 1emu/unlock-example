import React from "react"
import "./App.css"
import background from "./images/dao_background.png"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.unlockHandler = this.unlockHandler.bind(this)
    this.checkout = this.checkout.bind(this)
    this.state = {
      locked: "pending"
    }
  }

  componentDidMount() {
    window.addEventListener("unlockProtocol", this.unlockHandler)
    this.ensureCheckoutLoaded();
  }

  componentWillUnmount() {
    window.removeEventListener("unlockProtocol", this.unlockHandler)
  }

  checkout() {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  unlockHandler(e) {
    this.setState(state => {
      return {
        ...state,
        locked: e.detail
      }
    })
  }

  ensureCheckoutLoaded() {
    const maxRetries = 5;
    let attempts = 0;

    const loadModal = () => {
      if (window.unlockProtocol) {
        window.unlockProtocol.loadCheckoutModal();
      } else if (attempts < maxRetries) {
        attempts += 1;
        setTimeout(loadModal, 1000);
      } else {
        console.error("Failed to load the checkout modal after multiple attempts.");
      }
    };

    loadModal();
  }

  render() {
    const { locked } = this.state
    const backgroundStyle = {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    return (
        <div className="App" style={backgroundStyle}>
          <header className="App-header"></header>
        </div>
    );
  }
}

export default App;
