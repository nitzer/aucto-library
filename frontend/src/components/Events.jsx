import { notification } from "antd";
import React from "react";

export function Events({ events }) {
  const [api, contextHolder] = notification.useNotification();

  events.map((event) => {
    return api.info({
      message: `New Book!`,
      description: `New book: ${event.book.title} has been added!`,
      placement: 'bottomRight'
    });
  });

  return contextHolder;
}
