import React, { Component } from "react";

class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      addMore: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.current);
    this.setState({
      current: {}
    });
  };

  handleAddBTN = e => {
    e.preventDefault();
    let current = { ...this.state.current };
    current["moreFields"] = false;
    this.setState({ addMore: {}, current });
    this.props.addMoreFields(this.state.addMore);
  };

  handleChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    let current = { ...this.state.current };

    if (e.target.multiple) {
      const options = e.target.options;
      current[name] = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          current[name].push(options[i].value);
        }
      }
    } else if (e.target.type === "checkbox") {
      current[name] = e.target.checked;
    } else {
      current[name] = value;
    }

    this.setState({
      current
    });
  };

  // Handle add more fields
  handleChange2 = e => {
    let value = e.target.value;
    let name = e.target.name;
    let addMore = { ...this.state.addMore };
    addMore[name] = value;
    if (!this.state.addMore.id) {
      addMore["id"] = Math.floor(Math.random() * Date.now());
      addMore["addMore"] = true;
    }
    this.setState({
      addMore
    });
    console.log(this.state.addMore);
  };

  // Render Form Elements(fields)
  renderFormElements = () => {
    let formElements = this.props.formData.map((e, index) => {
      // add option into select element
      const addOption = array => {
        let i = 0;
        let option = array.map(o => (
          <option key={i++} value={o.value}>
            {o.label}
          </option>
        ));
        return option;
      };

      //Add more Fields!
      const moreFields = check => {
        if (check) {
          return (
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                value={this.state.addMore["type"] || ""}
                onChange={this.handleChange2}
                className="form-control form-control-sm"
              >
                <option value="month">Month</option>
                <option value="time">Time</option>
                <option value="range">Range</option>
                <option value="date">Date</option>
              </select>

              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={this.state.addMore["name"] || ""}
                onChange={this.handleChange2}
                className="form-control form-control-sm"
              />

              <label htmlFor="label">Label</label>
              <input
                type="text"
                name="label"
                value={this.state.addMore["label"] || ""}
                onChange={this.handleChange2}
                className="form-control form-control-sm"
              />

              <input type="button" value="add" onClick={this.handleAddBTN} />
            </div>
          );
        }
        return null;
      };

      let properties = e.properties || {};
      // create Input elements
      let input = () => {
        switch (e.type) {
          case "text":
          case "email":
          case "password":
          case "number":
          case "date":
          case "search":
          case "month":
          case "time":
          case "range":
          case "color":
            return (
              <div className="form-group" key={e.id + index}>
                <label htmlFor={e.name}>{e.label}</label>
                <input
                  {...properties}
                  type={e.type}
                  name={e.name}
                  value={this.state.current[e.name] || ""}
                  onChange={this.handleChange}
                  className={"form-control form-control-sm"}
                />

                <datalist
                  id={e.properties !== undefined ? e.properties.list : ""}
                >
                  {addOption(e.dataList || [])}
                </datalist>
                <small className="form-text text-muted my-1">{e.notes}</small>
              </div>
            );
          case "radio":
            return (
              <div className="form-group" key={e.id + index}>
                <input
                  {...properties}
                  type={e.type}
                  name={e.name}
                  value={e.value || ""}
                  onChange={this.handleChange}
                />
                <label htmlFor={e.name} className="form-check-label ml-3">
                  {e.label}
                </label>
                <small className="form-text text-muted my-1">{e.notes}</small>
              </div>
            );
          case "textarea":
            return (
              <div className="form-group" key={e.id + index}>
                <label htmlFor={e.name}>{e.label}</label>
                <textarea
                  {...properties}
                  type={e.type}
                  name={e.name}
                  value={this.state.current[e.name] || ""}
                  onChange={this.handleChange}
                  className="form-control form-control-sm"
                />
                <small className="form-text text-muted my-1">{e.notes}</small>
              </div>
            );
          case "select":
            return (
              <div className="form-group" key={e.id + index}>
                <label htmlFor={e.name}>{e.label}</label>
                <select
                  {...properties}
                  name={e.name}
                  value={
                    e.properties.multiple
                      ? this.state.current[e.name] || []
                      : this.state.current[e.name] || ""
                  }
                  onChange={this.handleChange}
                  className="form-control form-control-sm"
                >
                  {addOption(e.option)}
                </select>
                <small className="form-text text-muted my-1">{e.notes}</small>
              </div>
            );
          case "file":
            return (
              <div className="custom-file" key={e.id + index}>
                <input
                  {...properties}
                  type={e.type}
                  name={e.name}
                  value={this.state.current[e.name] || ""}
                  onChange={this.handleChange}
                  className="custom-file-input"
                />
                <label htmlFor={e.name} className="custom-file-label">
                  {this.state.current[e.name] || e.label}
                </label>
                <small className="form-text text-muted my-1">{e.notes}</small>
              </div>
            );
          case "checkbox":
            return (
              <div className="form-group form-check" key={e.id + index}>
                <input
                  {...properties}
                  type={e.type}
                  name={e.name}
                  checked={this.state.current[e.name] || false}
                  onChange={this.handleChange}
                  className={"form-check-input"}
                />
                <label htmlFor={e.name} className="form-check-label">
                  {e.label}
                </label>

                {e.name === "moreFields" &&
                  moreFields(this.state.current.moreFields)}
                <small className="form-text text-muted my-1">{e.notes}</small>
              </div>
            );
          default:
            return null;
        }
      };
      return input();
    });

    return formElements;
  };

  render() {
    return (
      <div>
        <h2>{this.props.formTitle || "My Form"}</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderFormElements()}
          <small className="form-text text-muted my-3">
            {this.props.formNotes}
          </small>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default DynamicForm;
