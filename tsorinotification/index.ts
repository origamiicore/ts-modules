import TsOriNotification from "./src";
import EmailConfig from "./src/models/emailConfig";
import NotificationConfig from "./src/models/notificationConfig";
import TelegramConfig from "./src/models/telegramConfig";
import WebServiceConfig from "./src/models/webServiceConfig";
import NotificationRouter from "./src/notificationRouter";

export {
    NotificationConfig,
    EmailConfig,
    WebServiceConfig,
    NotificationRouter,
    TelegramConfig
};
export default TsOriNotification;