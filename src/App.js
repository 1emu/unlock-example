import React from "react"
import "./App.css"
import background from "./images/dao_background.png"
import MintButton from "./MintButton";

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
    this.checkout();
  }

  componentWillUnmount() {
    window.removeEventListener("unlockProtocol", this.unlockHandler)
  }

  checkout() {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  /**
   * event handler
   * @param {*} e
   */
  unlockHandler(e) {
    this.setState(state => {
      return {
        ...state,
        locked: e.detail
      }
    })
  }

  render() {
    const { locked } = this.state
    const backgroundStyle = {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100vw",
    };

    return (
        <div className="App" style={backgroundStyle}>
          <header className="App-header">
          </header>
          <main className="Main">
              {/*{locked === "locked" && (*/}
              {/*      <MintButton onClick={this.checkout} />*/}
              {/*)}*/}
              {/*{locked === "unlocked" && (*/}
              {/*    <div>*/}
              {/*      You already have a ticket!{" "}*/}
              {/*      <span aria-label="unlocked" role="img">*/}
              {/*  🗝*/}
              {/*</span>*/}
              {/*    </div>*/}
              {/*)}*/}
          </main>
        </div>
    )
  }
}

export default App;
