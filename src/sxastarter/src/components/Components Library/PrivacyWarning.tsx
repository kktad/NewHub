import { ComponentProps } from "lib/component-props";
import React, { useState } from "react";
import Modal from 'react-modal';
import { RichTextField } from "@sitecore-jss/sitecore-jss-nextjs";

interface Fields {
    data: {
        datasource: {
            privacyWarningContent: {
                value: string
            },
            privacyWarningButtonText: {
                value: string
            },
            whitelist: {
                targetItems: [
                    {
                        name: string,
                        link: {
                            url: string
                        }
                    }
                ]
            },
            learnMoreTarget: {
                field: {
                    value: {
                        href: string
                    }
                }
            },
            learnMoreText: {
                value: string
            },
            privacyWarningType: {
                targetItem: {
                    field: {
                        value: string
                    }
                }
            }
        }
    }
}

type PrivacyWarningProps = ComponentProps & {
    fields: Fields;
};

export const Default = (props: PrivacyWarningProps): JSX.Element => {
    const privacyData = props.fields.data.datasource;
    const [modalIsOpen, setModalIsOpen] = useState(false); // Initially closed

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <button className="open-modal-button" onClick={openModal}>
                Privacy Modal
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Privacy Warning Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="ModalHeader">
                    <div className="header-custom">
                        <h4>Privacy Warning</h4>
                        <button className="CloseButton" onClick={closeModal}>
                            <span>X</span>
                        </button>
                    </div>
                </div>
                <div className="ModalContent">
                    <p>{privacyData.privacyWarningContent.value}</p>
                </div>
                <div className="modal--btns">
                    <a className="learnmore" href={privacyData.learnMoreTarget.field.value}>
                        {privacyData.learnMoreText.value}
                    </a>
                    <button className="confirm" onClick={closeModal}>
                        {privacyData.privacyWarningButtonText.value}
                    </button>
                </div>
            </Modal>
        </div>
    );
};
