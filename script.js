var FriendsContainer = React.createClass({
  /* COMPONENT LIFECYCLE EVENTS */

  // Invoked once before first render
  // Getting references to something like Firebase go here
  componentWillMount: function() {
    // Calling setState here does not cause a re-render
    console.log("componentWillMount");
  },

  // Invoked once after the first render
  // AJAX calls to fetch data go here
  componentDidMount: function() {
    // You now have access to this.getDOMNode()
    console.log("componentDidMount");
  },

  // Invoked whenever there is a prop change
  // Called BEFORE render
  // Use this method as a way to react to a prop change before render() is called by updating the state with setState
  componentWillReceiveProps: function(nextProps) {
    // Not called for the initial render
    // Previous props can be accessed by this.props
    // Calling setState here does not trigger an additional re-render
    console.log("componentWillReceiveProps", nextProps);
  },

  // Called IMMEDIATELY before a component is unmounted
  // Clean up any references (e.g. Firebase created in componentWillMount)
  componentWillUnmount: function() {
    console.log("componentWillUnmount");
  },


  getInitialState: function() {
    return {
      name: 'Alex',
      friends: ['Petey', 'Jesse', 'Aditi']
    };
  },
  addFriend: function(friend) {
    this.setState({
      friends: this.state.friends.concat([friend])
    });
  },
  render: function() {
      return (
        <div>
          <h3>Name: {this.state.name}</h3>
          <AddFriend addNew={this.addFriend} />
          <ShowList friends={this.state.friends} />
        </div>
      )
  }
});

var AddFriend = React.createClass({
  getInitialState: function() {
    return {
      newFriend: ""
    };
  },
  propTypes: {
    addNew: React.PropTypes.func.isRequired
  },
  updateNewFriend: function(e) {
    this.setState({
      newFriend: e.target.value
    });
  },
  handleAddNew: function() {
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ""
    });
  },
  render: function() {
    return (
      <div>
        <input type="text" value={this.state.newFriend} onChange={this.updateNewFriend} />
        <button onClick={this.handleAddNew}>Add New Friend</button>
      </div>
    )
  }
});

var ShowList = React.createClass({
  getDefaultProps: function() {
    return {
      friends: []
    };
  },
  render: function() {
    var friends = this.props.friends.map(function(friend) {
      return <li>{friend}</li>;
    });

    return (
      <div>
        <h3>Friends</h3>
        <ol>{friends}</ol>
      </div>
    );
  }
});

React.render(<FriendsContainer />, document.getElementById("example"));
