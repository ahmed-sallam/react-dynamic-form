import React, { Component } from "react";
import DynamicForm from "./components/DynamicForm";
import apiData from "./apiData.json";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTitle: "",
      formData: [],
      formNotes: "",
      data: [],
      res: {}
    };
  }

  componentWillMount() {
    let formTitle = apiData.formTitle;
    let formData = apiData.formData;
    let formNotes = apiData.formNotes;
    this.setState({ formTitle, formData, formNotes });
  }
  onSubmit = d => {
    // remove additional fields after submit
    let formData = this.state.formData.filter(e => !e.addMore);

    this.setState({ data: [...this.state.data, d], formData });

    // POST data to an API
    // axios
    //   .post("https://jsonplaceholder.typicode.com/posts", this.state.data)
    //   .then(res => {
    //     this.setState({ res });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  addMoreFields = f => {
    this.setState({ formData: [...this.state.formData, f] });
  };

  render() {
    let { formTitle, formData, formNotes } = this.state;
    return (
      <div className="container">
        <DynamicForm
          formTitle={formTitle}
          formData={formData}
          formNotes={formNotes}
          onSubmit={d => this.onSubmit(d)}
          addMoreFields={f => this.addMoreFields(f)}
        />

        <h2 className="my-4">The Result</h2>

        {this.state.data.length > 0 && JSON.stringify(this.state.data)}

        {/* <h2>The API Response</h2>
              <p style={{ overflow: "hidden" }}>
                {this.state.data.length > 0 && JSON.stringify(this.state.res)}
              </p> */}
      </div>
    );
  }
}

export default App;
