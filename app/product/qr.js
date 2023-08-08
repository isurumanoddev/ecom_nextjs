import React, { useEffect, useState } from "react";
import { Popover, QRCode, Space, Tooltip } from "antd";
import DashboardBreadcrumb from "../../components/layout/DashboardBreadcrumb";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PlusCircleOutlined,
  StopOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import ChangeTableModal from "../../components/modals/ChangeTableModal";
import GetQrCardsApi from "../../api/Qr/GetQrCardsApi";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../helpers/Notifications";
import DisableQrApi from "../../api/Qr/DisableQrApi";
import EnableQrApi from "../../api/Qr/EnableQrApi";
import { STATUS } from "../../helpers/constants";
import RemoveQrTableApi from "../../api/Qr/RemoveQrTableApi";
import {useSelector} from "react-redux";
import {selectId} from "../../features/BusinessSlice";

function QRCodes() {
  const [changeTableModal, setChangeTableModal] = useState(false);
  const [data, setData] = useState();
  const [qrData, setQrData] = useState();
  const [disableModal, setDisableModal] = useState(false);
  const [disableId, setDisableId] = useState();
  const [enableModal, setEnableModal] = useState(false);
  const [enableId, setEnableId] = useState();
  const [removeModal, setRemoveModal] = useState(false);
  const [removeId, setRemoveId] = useState();

  const businessId = useSelector(selectId)
  console.log("businessId ", businessId)

  useEffect(() => {
    getQrCodes();
  }, []);

  async function getQrCodes() {
    const apiResponse = await GetQrCardsApi();
    if (apiResponse.success) {
      setData(apiResponse.data);
    }
  }

  async function disableQr() {
    const apiResponse = await DisableQrApi(disableId);
    if (apiResponse.error) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.success) {
      openNotificationSuccess("bottomRight", "Qr disabled");
      getQrCodes();
    } else {
      openNotificationError(
        "bottomRight",
        "Couldn't disable. Try again later."
      );
    }
    setDisableId("");
  }

  async function enableQr() {
    const apiResponse = await EnableQrApi(enableId);
    if (apiResponse.error) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.success) {
      openNotificationSuccess("bottomRight", "Qr enabled");
      getQrCodes();
    } else {
      openNotificationError("bottomRight", "Couldn't enable. Try again later.");
    }
    setEnableId("");
  }

  async function removeTable() {
    const apiResponse = await RemoveQrTableApi(removeId);
    if (apiResponse.error) {
      openNotificationError("bottomRight", apiResponse.message);
    } else if (apiResponse.success) {
      openNotificationSuccess("bottomRight", "removed qr's table");
      getQrCodes();
    } else {
      openNotificationError("bottomRight", "Couldn't remove. Try again later.");
    }
    setRemoveId("");
  }

  function getQrDetails() {
    let output = [];
    data?.forEach((qrs) => {
      output.push(
        <div className="bg-white p-5 rounded-md">
          <div className="flex items-center justify-between mb-3">
            <div className="text-base text-gray-600 font-semibold">
              {qrs.status === STATUS.Active ? (
                qrs.table?.name ? (
                  <>
                    <div className="flex gap-2">
                      <div>{qrs?.table?.name}</div>
                      <Tooltip title={"Remove table"}>
                        <div
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                          onClick={() => {
                            setRemoveModal(true);
                            setRemoveId(qrs.id);
                          }}
                        >
                          <DeleteOutlined />
                        </div>
                      </Tooltip>
                      <Tooltip>
                        <div
                          className="text-blue-500 hover:text-blue-600 cursor-pointer"
                          onClick={() => {
                            setChangeTableModal(true);
                            setQrData(qrs);
                          }}
                        >
                          <SwapOutlined />
                        </div>
                      </Tooltip>
                    </div>
                  </>
                ) : null
              ) : (
                <div className="text-orange-500">Disabled..</div>
              )}
            </div>{" "}
            <Space size="middle">
              {qrs.status === STATUS.Active ? (
                <>
                  {!qrs.table?.name && (
                    <Tooltip title={"Assign table"}>
                      <div
                        className="text-blue-500 hover:text-blue-600 cursor-pointer"
                        onClick={() => {
                          setChangeTableModal(true);
                          setQrData(qrs);
                        }}
                      >
                        <PlusCircleOutlined />
                      </div>
                    </Tooltip>
                  )}

                  {!qrs.table?.id ? (
                    <Tooltip title={"Disable"}>
                      <div
                        className="text-orange-500 hover:text-orange-600 cursor-pointer"
                        onClick={() => {
                          setDisableModal(true);
                          setDisableId(qrs.id);
                        }}
                      >
                        <StopOutlined />
                      </div>{" "}
                    </Tooltip>
                  ) : (
                    <Popover
                      placement="left"
                      content="Can't disable, this qr assigned with table"
                      trigger="hover"
                    >
                      <StopOutlined className="text-gray-500" />
                    </Popover>
                  )}

                  <Tooltip title={"Download"}>
                    <div
                      className="text-green-500 hover:text-green-600 cursor-pointer"
                      onClick={() => downloadQRCode()}
                    >
                      <DownloadOutlined />
                    </div>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title={"Enable"}>
                  <div
                    className="text-green-500 hover:text-green-600 cursor-pointer"
                    onClick={() => {
                      setEnableModal(true);
                      setEnableId(qrs.id);
                    }}
                  >
                    <CheckCircleOutlined />
                  </div>
                </Tooltip>
              )}
            </Space>
          </div>
          <div className="myqrcode">
             <QRCode className="mx-auto" value = {`http://localhost:3000?${businessId}/${qrs.id}`}/>
          </div>
          <div className="text-center mt-3 text-gray-600"> {qrs?.id}</div>
        </div>
      );
    });
    return output;
  }

  const downloadQRCode = () => {
    const canvas = document.querySelector(".myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const left = <div className="pri-font text-lg">QR Codes</div>;
  return (
    <>
      <DashboardBreadcrumb left={left} />
      <div className="grid grid-cols-3 gap-5">{getQrDetails()}</div>
      <ChangeTableModal
        visible={changeTableModal}
        data={qrData}
        handleCancel={() => setChangeTableModal(false)}
        handleOk={() => {
          getQrCodes();
          setChangeTableModal(false);
        }}
      />
      <ConfirmationModal
        visible={disableModal}
        handleCancel={() => setDisableModal(false)}
        handleOk={() => {
          disableQr();
          setDisableModal(false);
        }}
        text="Are you sure want to disable this qr?"
        title="Disable qr"
      />
      <ConfirmationModal
        visible={enableModal}
        handleCancel={() => setEnableModal(false)}
        handleOk={() => {
          enableQr();
          setEnableModal(false);
        }}
        text="Are you sure want to enable this qr?"
        title="Enable qr"
      />
      <ConfirmationModal
        visible={removeModal}
        handleCancel={() => setRemoveModal(false)}
        handleOk={() => {
          removeTable();
          setRemoveModal(false);
        }}
        text="Are you sure want to remove this table from qr?"
        title="Remove table"
      />
    </>
  );
}

export default QRCodes;
