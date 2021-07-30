import React, { Component } from "react";
import {
  FormattedMessage,
  FormattedDate,
  FormattedTime,
  IntlProvider,
} from "react-intl";
import { useParams } from "react-router-dom";

class FormattedIntl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Eric",
      unreadCount: 1000,
    };
  }

  render() {
    const { name, unreadCount } = this.state;

    return (
      <p>
        <FormattedMessage id="links">
          {({ test }) => <code>{JSON.stringify(test, null, 2)}</code>}
        </FormattedMessage>
        <FormattedDate
          month="short"
          timeZone="UTC"
          day="2-digit"
          value="2017-05-13T18:16:00Z"
        />
        <span style={{ marginLeft: "1rem" }}>
          <FormattedTime
            timeZone="America/Los_Angeles"
            value="2017-05-13T18:16:00Z"
          >
            {(...args) => <code>{JSON.stringify(args, null, 2)}</code>}
          </FormattedTime>
        </span>
      </p>
    );
  }
}

export default (props) => {
  const {
    match: { params },
  } = props;

  if (!params.lang) params.lang = "en";

  return (
    <IntlProvider
      locale={params.lang}
      messages={{ links: { test: "hi" } }}
    >
      {params.lang}
      <FormattedIntl />
    </IntlProvider>
  );
};
