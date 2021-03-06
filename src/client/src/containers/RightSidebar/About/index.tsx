import * as React from "react";
import { connect } from "react-redux";
import styles from "./styles.module.css";

import * as ModalActions from "../../../actions/modalActions/modalActions";

import { getVersionsSelector } from "../../../selectors/vscodeApiSelector";
import { IVersions } from "../../../types/version";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../../reducers";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../../utils/constants";
import { IRedirectModalData } from "../../RedirectModal";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../../actions/ActionType";
import messages from "./messages";

interface IStateProps {
  versions: IVersions;
}

interface IDispatchProps {
  openRedirectModal: (feedbackLinkData: IRedirectModalData | undefined) => any;
}

type Props = IStateProps & InjectedIntlProps & IDispatchProps;

const About = ({ versions, intl, openRedirectModal }: Props) => {
  const { templatesVersion, wizardVersion } = versions;
  const { formatMessage } = intl;

  return (
    <div className={styles.container}>
      <div>
        <button
          className={styles.buttonToLink}
          onClick={() =>
            openRedirectModal({
              redirectLink: WEB_TEMPLATE_STUDIO_LINKS.REPO,
              redirectLinkLabel: intl.formatMessage(
                messages.feedbackRedirectLinkLabel
              ),
              privacyStatementLink: "",
              isThirdPartyLink: false
            })
          }
        >
          {formatMessage(messages.visitRepo)}
        </button>
      </div>
      <div>
        <button
          className={styles.buttonToLink}
          onClick={() =>
            openRedirectModal({
              redirectLink: WEB_TEMPLATE_STUDIO_LINKS.ISSUES,
              redirectLinkLabel: intl.formatMessage(
                messages.feedbackRedirectLinkLabel
              ),
              privacyStatementLink: "",
              isThirdPartyLink: false
            })
          }
        >
          {formatMessage(messages.reportIssue)}
        </button>
      </div>

      <div className={styles.wizardInfo}>
        {formatMessage(messages.templatesVersion) + ` ${templatesVersion}`}
      </div>
      <div className={styles.wizardInfo}>
        {formatMessage(messages.wizardVersion) + ` ${wizardVersion}`}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  versions: getVersionsSelector(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  openRedirectModal: (feedbackLinkData: IRedirectModalData | undefined) => {
    dispatch(ModalActions.openRedirectModalAction(feedbackLinkData));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(About));
