import React,{Component} from "react";
import RequestCard from "./RequestCard";
import PropTypes from 'prop-types';

export class RequestList extends Component{
  renderRequests() {
    return this.props.requests.map((request) => {
      return (
        <RequestCard key={request._id._id}
                     colNum='col-md-3 col-xs-6'
                     request={request._id}
        />
      )
    });
  }
  render(){
    return(<div className="row">
      {this.renderRequests()}
    </div>)
  }
}
RequestList.propTypes = {
  requests: PropTypes.array.isRequired
};


