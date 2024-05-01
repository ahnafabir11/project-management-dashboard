"use client";
import { Timeline, Typography, Space } from "antd";
import React from "react";

export default function ProjectTimeline() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <Typography.Title level={3} className="!mb-8">
        Project Timeline
      </Typography.Title>

      <Timeline
        mode="alternate"
        items={[
          {
            children: (
              <Space direction="vertical">
                <Typography.Text mark>01 May 2023 11:30</Typography.Text>
                <Typography.Text>
                  New Task Created by{" "}
                  <Typography.Text code>Ahnaf Abir</Typography.Text>
                </Typography.Text>
              </Space>
            ),
          },
          {
            children: (
              <Space direction="vertical">
                <Typography.Text mark>01 May 2023 11:30</Typography.Text>
                <Typography.Text>
                  New Task Created by{" "}
                  <Typography.Text code>Ahnaf Abir</Typography.Text>
                </Typography.Text>
              </Space>
            ),
          },
          {
            children: (
              <Space direction="vertical">
                <Typography.Text mark>01 May 2023 11:30</Typography.Text>
                <Typography.Text>
                  New Task Created by{" "}
                  <Typography.Text code>Ahnaf Abir</Typography.Text>
                </Typography.Text>
              </Space>
            ),
          },
          {
            children: (
              <Space direction="vertical">
                <Typography.Text mark>01 May 2023 11:30</Typography.Text>
                <Typography.Text>
                  New Task Created by{" "}
                  <Typography.Text code>Ahnaf Abir</Typography.Text>
                </Typography.Text>
              </Space>
            ),
          },
          {
            children: (
              <Space direction="vertical">
                <Typography.Text mark>01 May 2023 11:30</Typography.Text>
                <Typography.Text>
                  New Task Created by{" "}
                  <Typography.Text code>Ahnaf Abir</Typography.Text>
                </Typography.Text>
              </Space>
            ),
          },
          {
            children: (
              <Space direction="vertical">
                <Typography.Text mark>01 May 2023 11:30</Typography.Text>
                <Typography.Text>
                  New Task Created by{" "}
                  <Typography.Text code>Ahnaf Abir</Typography.Text>
                </Typography.Text>
              </Space>
            ),
          },
        ]}
      />
    </main>
  );
}
