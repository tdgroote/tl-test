import React from 'react';

class Alert extends React.Component {
    render() {
        return <div>
            <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">{this.props.message}</div>
                        <div className="modal-footer">
                            <button onClick={this.props.onClose} className="btn">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>;
    }
}

export default Alert;
