import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  InputGroup,
  Input,
  InputGroupAddon,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import jwt from 'jsonwebtoken';
import { fetchManufacturers } from '../../actions';
import { ManufacturerListItem, Loader } from '../../components';
import config from '../../config';

class ManufacturerList extends Component {
  constructor(props) {
    super(props);
    const { data: { storeId } } = jwt.decode(localStorage.getItem(config.accessTokenKey));

    this.state = {
      pageSize: 20,
      storeId,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(
      fetchManufacturers(
        {
          storeId: this.state.storeId,
          pageSize: this.state.pageSize,
          pageNo: 1,
        }
      )
    );
  }

  onViewClick = id => {
    this.props.history.push(`/manufacturers/${id}`);
  };

  onPageChange = page => {
    const { dispatch } = this.props;

    dispatch(
      fetchManufacturers(
        {
          storeId: this.state.storeId,
          pageSize: this.state.pageSize,
          pageNo: page.selected + 1,
        }
      )
    );
  }

  render() {
    const {
      history,
      manufacturers,
      total,
      count,
      fetchSuccess,
      intl: { formatMessage },
    } = this.props;

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.manufacturers" />
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="content-body">
          <div className="table-container">
            <Col md={12} className="table-content">
              {
                !fetchSuccess ? <Loader /> :
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <InputGroup size="sm">
                          <Input placeholder={formatMessage({ id: 'sys.search' })} />
                          <InputGroupAddon addonType="append">
                            <Button color="secondary">
                              <FiSearch />
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      <Button
                        size="sm"
                        color="primary"
                        className="pull-right form-btn"
                        onClick={() => history.push('/new-manufacturer')}
                      >
                        <FiPlusCircle />
                        &nbsp;
                        <FormattedMessage id="sys.addNew" />
                      </Button>
                    </div>
                    <br />
                    <Table responsive size="sm">
                      <thead className="table-header">
                        <tr>
                          <th>
                            <FormattedMessage id="sys.logo" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.name" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.contactInfo" />
                          </th>
                          <th>
                            <FormattedMessage id="sys.status" />
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {manufacturers.length > 0 ? manufacturers.map(manufacturer => (
                          <ManufacturerListItem
                            key={manufacturer.code}
                            id={manufacturer.code}
                            logo={manufacturer.logo}
                            name={manufacturer.name}
                            url={manufacturer.url}
                            address={manufacturer.address}
                            email={manufacturer.email}
                            contact={manufacturer.contact}
                            status={manufacturer.status}
                            onClick={this.onViewClick}
                          />
                        )) : <tr><td><FormattedMessage id="sys.noRecords" /></td></tr>}
                      </tbody>
                    </Table>
                    <div className="pagination-container">
                      <span className="text-muted">Total {count} entries</span>
                      <ReactPaginate
                        pageCount={total || 1}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        containerClassName="pagination"
                        subContainerClassName="pages pagination"
                        pageClassName="page-item"
                        breakClassName="page-item"
                        breakLabel="..."
                        pageLinkClassName="page-link"
                        previousLabel="‹"
                        nextLabel="›"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        onPageChange={this.onPageChange}
                      />
                    </div>
                  </div>
              }
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

ManufacturerList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  manufacturers: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
  fetchSuccess: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const diff = state.manufacturerReducer.manufacturers.count / 20;
  return ({
    manufacturers: state.manufacturerReducer.manufacturers.data,
    count: state.manufacturerReducer.manufacturers.count,
    fetchSuccess: state.manufacturerReducer.fetchSuccess,
    total: Number.isInteger(diff) ? diff : parseInt(diff) + 1,
  });
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(injectIntl(ManufacturerList))
);
