import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";
import { For, JSX } from "solid-js";

import { TablerLoaderIcon } from "../icon";
import { Button, IconButton } from "./button";
import { ButtonProps } from "./button.props";

type Story = StoryObj<ButtonProps>;

export default {
  title: "Button",
  argTypes: {
    fullWidth: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    loadingPlacement: {
      options: ["center", "start", "end"],
      control: { type: "radio" },
    },
    children: {
      control: { type: "text" },
    },
  },
} as Meta<ComponentProps<typeof Button>>;

export const Variants: Story = {
  args: {
    children: "Button",
  },
  // @ts-ignore
  render: props => (
    <div class="flex items-center space-x-4">
      <Button {...props} variant="solid" />
      <Button {...props} variant="soft" />
      <Button {...props} variant="inverted" />
      <Button {...props} variant="default" />
      <Button {...props} variant="dashed" />
      <Button {...props} variant="text" />
      <Button {...props} variant="link" />
    </div>
  ),
};

export const Colors: Story = {
  args: {
    children: "Button",
  },
  // @ts-ignore
  render: props => (
    <div class="flex flex-col gap-4">
      <For each={["solid", "soft", "inverted"] as const}>
        {variant => (
          <div class="flex items-center space-x-4">
            <For each={["primary", "success", "info", "warning", "danger", "discovery"] as const}>
              {color => <Button {...props} variant={variant} color={color} />}
            </For>
          </div>
        )}
      </For>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: "Button",
  },
  // @ts-ignore
  render: props => (
    <div class="flex items-center space-x-4">
      <Button {...props} size="xs" />
      <Button {...props} size="sm" />
      <Button {...props} size="md" />
      <Button {...props} size="lg" />
      <Button {...props} size="xl" />
    </div>
  ),
};

export const Decorators: Story = {
  args: {
    children: "Button",
  },
  // @ts-ignore
  render: props => (
    <div class="flex flex-col gap-4">
      <div class="flex items-center space-x-4">
        <Button {...props} size="xs" startDecorator={<TablerLoaderIcon />} />
        <Button {...props} size="sm" startDecorator={<TablerLoaderIcon />} />
        <Button {...props} size="md" startDecorator={<TablerLoaderIcon />} />
        <Button {...props} size="lg" startDecorator={<TablerLoaderIcon />} />
        <Button {...props} size="xl" startDecorator={<TablerLoaderIcon />} />
      </div>
      <div class="flex items-center space-x-4">
        <Button {...props} size="xs" endDecorator={<TablerLoaderIcon />} />
        <Button {...props} size="sm" endDecorator={<TablerLoaderIcon />} />
        <Button {...props} size="md" endDecorator={<TablerLoaderIcon />} />
        <Button {...props} size="lg" endDecorator={<TablerLoaderIcon />} />
        <Button {...props} size="xl" endDecorator={<TablerLoaderIcon />} />
      </div>
    </div>
  ),
};

export const IconOnly: Story = {
  args: {
    children: TablerLoaderIcon as unknown as JSX.Element,
  },
  // @ts-ignore
  render: props => (
    <div class="flex items-center space-x-4">
      <IconButton {...props} size="xs" aria-label="Button" />
      <IconButton {...props} size="sm" aria-label="Button" />
      <IconButton {...props} size="md" aria-label="Button" />
      <IconButton {...props} size="lg" aria-label="Button" />
      <IconButton {...props} size="xl" aria-label="Button" />
    </div>
  ),
};
