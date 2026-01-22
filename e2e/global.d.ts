/**
 * Detox Global Type Declarations
 */

declare const device: Detox.Device;
declare const element: Detox.Element;
declare const by: Detox.Matchers;
declare const waitFor: Detox.WaitFor;

declare namespace Detox {
  interface Device {
    launchApp(params?: any): Promise<void>;
    reloadReactNative(): Promise<void>;
    sendToHome(): Promise<void>;
    terminateApp(): Promise<void>;
    openURL(params: { url: string }): Promise<void>;
    setOrientation(orientation: 'portrait' | 'landscape'): Promise<void>;
  }

  interface Element {
    (matcher: Matchers): ElementActions;
  }

  interface ElementActions {
    tap(): Promise<void>;
    longPress(): Promise<void>;
    multiTap(times: number): Promise<void>;
    typeText(text: string): Promise<void>;
    replaceText(text: string): Promise<void>;
    clearText(): Promise<void>;
    scroll(pixels: number, direction: 'up' | 'down' | 'left' | 'right'): Promise<void>;
    scrollTo(edge: 'top' | 'bottom' | 'left' | 'right'): Promise<void>;
    swipe(direction: 'up' | 'down' | 'left' | 'right', speed?: 'fast' | 'slow', percentage?: number): Promise<void>;
  }

  interface Matchers {
    id(id: string): Matchers;
    text(text: string): Matchers;
    label(label: string): Matchers;
    type(type: string): Matchers;
    traits(traits: string[]): Matchers;
  }

  interface WaitFor {
    (element: ElementActions): ExpectActions;
  }

  interface ExpectActions {
    toBeVisible(): Promise<void>;
    toBeNotVisible(): Promise<void>;
    toExist(): Promise<void>;
    toNotExist(): Promise<void>;
    toHaveText(text: string): Promise<void>;
    toHaveLabel(label: string): Promise<void>;
    toHaveId(id: string): Promise<void>;
    withTimeout(timeout: number): this;
  }
}

declare namespace jest {
  interface Matchers<R> {
    toBeVisible(): R;
    toBeNotVisible(): R;
    toExist(): R;
    toNotExist(): R;
    toHaveText(text: string): R;
    toHaveLabel(label: string): R;
    toHaveId(id: string): R;
  }
}
