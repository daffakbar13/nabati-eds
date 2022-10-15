const CreateNotificationItems = (isRead: boolean, content: JSX.Element) => ({ isRead, content })

export const notificationItems = [
  CreateNotificationItems(false, (
    <p style={{ fontWeight: '600', marginBottom: 0 }}>
      Term of payment of the week, Please complete it before 01-01-2022
    </p>
  )),
  CreateNotificationItems(false, (
    <p style={{ fontWeight: '600', marginBottom: 0 }}>
      Term of payment following the month, Please complete it before
      01-01-2022
    </p>
  )),
  CreateNotificationItems(false, (
    <p style={{ fontWeight: '600', marginBottom: 0 }}>
      New Product Launch
    </p>
  )),
  CreateNotificationItems(false, (
    <p style={{ fontWeight: '600', marginBottom: 0 }}>
      You need review a approval Here
    </p>
  )),
]
