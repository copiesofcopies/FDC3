import { mock } from 'jest-mock-extended';
import {
  addContextListener,
  addIntentListener,
  broadcast,
  compareVersionNumbers,
  ContextHandler,
  ContextTypes,
  DesktopAgent,
  fdc3Ready,
  findIntent,
  findIntentsByContext,
  getCurrentChannel,
  getInfo,
  getOrCreateChannel,
  getSystemChannels,
  ImplementationMetadata,
  joinChannel,
  leaveCurrentChannel,
  open,
  raiseIntent,
  raiseIntentForContext,
  versionIsAtLeast,
} from '../src';

const UnavailableError = new Error('FDC3 DesktopAgent not available at `window.fdc3`.');
const TimeoutError = new Error('Timed out waiting for `fdc3Ready` event.');
const UnexpectedError = new Error('`fdc3Ready` event fired, but `window.fdc3` not set to DesktopAgent.');

const ContactContext = {
  type: ContextTypes.Contact,
  id: { email: 'test@example.com' },
};

expect.extend({
  toRejectWithUnavailableError(received) {
    expect(received).rejects.toEqual(UnavailableError);
    return { pass: true } as jest.CustomMatcherResult;
  },
  toThrowUnavailableError(received) {
    expect(received).toThrowError(UnavailableError);
    return { pass: true } as jest.CustomMatcherResult;
  },
});

describe('test ES6 module', () => {
  describe('without `window.fdc3` global', () => {
    test('open should reject', async () => {
      await expect(open(expect.any(String))).rejects.toEqual(UnavailableError);
    });

    test('findIntent should reject', async () => {
      await expect(findIntent(expect.any(String))).rejects.toEqual(UnavailableError);
    });

    test('findIntentsByContext should reject', async () => {
      await expect(findIntentsByContext(expect.any(Object))).rejects.toEqual(UnavailableError);
    });

    test('broadcast should throw', async () => {
      expect(() => broadcast(expect.any(Object))).toThrowError(UnavailableError);
    });

    test('raiseIntent should reject', async () => {
      await expect(raiseIntent(expect.any(String), expect.any(Object))).rejects.toEqual(UnavailableError);
    });

    test('raiseIntentForContext should reject', async () => {
      await expect(raiseIntentForContext(expect.any(Object))).rejects.toEqual(UnavailableError);
    });

    test('addIntentListener should throw', () => {
      expect(() => addIntentListener(expect.any(String), expect.any(Function))).toThrowError(UnavailableError);
    });

    test('addContextListener should throw', () => {
      expect(() => addContextListener(expect.any(Object))).toThrowError(UnavailableError);

      expect(() => addContextListener(expect.any(String), expect.any(Object))).toThrowError(UnavailableError);
    });

    test('getSystemChannels should reject', async () => {
      await expect(getSystemChannels()).rejects.toEqual(UnavailableError);
    });

    test('joinChannel should reject', async () => {
      await expect(joinChannel(expect.any(String))).rejects.toEqual(UnavailableError);
    });

    test('getOrCreateChannel should reject', async () => {
      await expect(getOrCreateChannel(expect.any(String))).rejects.toEqual(UnavailableError);
    });

    test('getCurrentChannel should reject', async () => {
      await expect(getCurrentChannel()).rejects.toEqual(UnavailableError);
    });

    test('leaveCurrentChannel should reject', async () => {
      await expect(leaveCurrentChannel()).rejects.toEqual(UnavailableError);
    });

    test('getInfo should throw', () => {
      expect(() => getInfo()).toThrowError(UnavailableError);
    });
  });

  describe('with `window.fdc3` global', () => {
    beforeAll(() => {
      window.fdc3 = mock<DesktopAgent>();
    });

    afterAll(() => {
      window.fdc3 = (undefined as unknown) as DesktopAgent;
    });

    test('open should delegate to window.fdc3.open', async () => {
      const target = 'MyApp';

      await open(target, ContactContext);

      expect(window.fdc3.open).toHaveBeenCalledTimes(1);
      expect(window.fdc3.open).toHaveBeenCalledWith(target, ContactContext);
    });

    test('findIntent should delegate to window.fdc3.findIntent', async () => {
      const intent = 'ViewChart';

      await findIntent(intent, ContactContext);

      expect(window.fdc3.findIntent).toHaveBeenCalledTimes(1);
      expect(window.fdc3.findIntent).toHaveBeenCalledWith(intent, ContactContext);
    });

    test('findIntentsByContext should delegate to window.fdc3.findIntentsByContext', async () => {
      await findIntentsByContext(ContactContext);

      expect(window.fdc3.findIntentsByContext).toHaveBeenCalledTimes(1);
      expect(window.fdc3.findIntentsByContext).toHaveBeenCalledWith(ContactContext);
    });

    test('broadcast should delegate to window.fdc3.broadcast', () => {
      broadcast(ContactContext);

      expect(window.fdc3.broadcast).toHaveBeenCalledTimes(1);
      expect(window.fdc3.broadcast).toHaveBeenCalledWith(ContactContext);
    });

    test('raiseIntent should delegate to window.fdc3.raiseIntent', async () => {
      const intent = 'ViewChart';
      const target = 'MyApp';

      await raiseIntent(intent, ContactContext, target);

      expect(window.fdc3.raiseIntent).toHaveBeenCalledTimes(1);
      expect(window.fdc3.raiseIntent).toHaveBeenCalledWith(intent, ContactContext, target);
    });

    test('raiseIntentForContext should delegate to window.fdc3.raiseIntentForContext', async () => {
      const app = 'MyApp';

      await raiseIntentForContext(ContactContext, app);

      expect(window.fdc3.raiseIntentForContext).toHaveBeenCalledTimes(1);
      expect(window.fdc3.raiseIntentForContext).toHaveBeenCalledWith(ContactContext, app);
    });

    test('addIntentListener should delegate to window.fdc3.addIntentListener', () => {
      const intent = 'ViewChart';
      const handler: ContextHandler = _ => {};

      addIntentListener(intent, handler);

      expect(window.fdc3.addIntentListener).toHaveBeenCalledTimes(1);
      expect(window.fdc3.addIntentListener).toHaveBeenCalledWith(intent, handler);
    });

    test('addContextListener should delegate to window.fdc3.addContextListener', () => {
      const type = 'fdc3.instrument';
      const handler1: ContextHandler = _ => {};
      const handler2: ContextHandler = _ => {};

      addContextListener(type, handler1);
      addContextListener(handler2);

      expect(window.fdc3.addContextListener).toHaveBeenCalledTimes(2);
      expect(window.fdc3.addContextListener).toHaveBeenNthCalledWith(1, type, handler1);
      expect(window.fdc3.addContextListener).toHaveBeenNthCalledWith(2, handler2);
    });

    test('getSystemChannels should delegate to window.fdc3.getSystemChannels', async () => {
      await getSystemChannels();

      expect(window.fdc3.getSystemChannels).toHaveBeenCalledTimes(1);
      expect(window.fdc3.getSystemChannels).toHaveBeenCalledWith();
    });

    test('joinChannel should delegate to window.fdc3.joinChannel', async () => {
      const channelId = 'channel';

      await joinChannel(channelId);

      expect(window.fdc3.joinChannel).toHaveBeenCalledTimes(1);
      expect(window.fdc3.joinChannel).toHaveBeenCalledWith(channelId);
    });

    test('getOrCreateChannel should delegate to window.fdc3.getOrCreateChannel', async () => {
      const channelId = 'channel';

      await getOrCreateChannel(channelId);

      expect(window.fdc3.getOrCreateChannel).toHaveBeenCalledTimes(1);
      expect(window.fdc3.getOrCreateChannel).toHaveBeenCalledWith(channelId);
    });

    test('getCurrentChannel should delegate to window.fdc3.getCurrentChannel', async () => {
      await getCurrentChannel();

      expect(window.fdc3.getCurrentChannel).toHaveBeenCalledTimes(1);
      expect(window.fdc3.getCurrentChannel).toHaveBeenCalledWith();
    });

    test('leaveCurrentChannel should delegate to window.fdc3.leaveCurrentChannel', async () => {
      await leaveCurrentChannel();

      expect(window.fdc3.leaveCurrentChannel).toHaveBeenCalledTimes(1);
      expect(window.fdc3.leaveCurrentChannel).toHaveBeenCalledWith();
    });

    test('getInfo should delegate to window.fdc3.getInfo', () => {
      getInfo();

      expect(window.fdc3.getInfo).toHaveBeenCalledTimes(1);
      expect(window.fdc3.getInfo).toHaveBeenCalledWith();
    });
  });

  describe('fdc3Ready', () => {
    let eventListeners: any;

    beforeEach(() => {
      jest.useFakeTimers();

      eventListeners = {};

      window.addEventListener = jest.fn((event, callback) => {
        eventListeners[event] = callback;
      });
    });

    afterEach(() => {
      window.fdc3 = (undefined as unknown) as DesktopAgent;
    });

    test('resolves immediately if `window.fdc3` is already defined', async () => {
      // set fdc3 object and call fdc3Ready
      window.fdc3 = mock<DesktopAgent>();
      const promise = fdc3Ready();

      expect(setTimeout).not.toHaveBeenCalled();
      expect(clearTimeout).not.toHaveBeenCalled();
      expect(eventListeners).not.toHaveProperty('fdc3Ready');
      await expect(promise).resolves.toBe(undefined);
    });

    test('waits for specified milliseconds', async () => {
      const waitForMs = 1000;

      const promise = fdc3Ready(waitForMs);

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), waitForMs);

      jest.advanceTimersByTime(waitForMs);

      await expect(promise).rejects.toEqual(TimeoutError);
    });

    test('waits for 5000 milliseconds by default', async () => {
      const defaultWaitForMs = 5000;

      const promise = fdc3Ready();

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), defaultWaitForMs);

      jest.advanceTimersByTime(defaultWaitForMs);

      await expect(promise).rejects.toEqual(TimeoutError);
    });

    test('`fdc3Ready` event cancels timeout and rejects if `window.fdc3` is not defined', () => {
      const promise = fdc3Ready();

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
      expect(eventListeners).toHaveProperty('fdc3Ready');

      // trigger fdc3Ready event without setting fdc3 object
      eventListeners['fdc3Ready']();

      expect(clearTimeout).toHaveBeenCalledTimes(1);
      return expect(promise).rejects.toEqual(UnexpectedError);
    });

    test('`fdc3Ready` event cancels timeout and resolves if `window.fdc3` is defined', async () => {
      const promise = fdc3Ready();

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
      expect(eventListeners).toHaveProperty('fdc3Ready');

      // set fdc3 object and trigger fdc3 ready event
      window.fdc3 = mock<DesktopAgent>();
      eventListeners['fdc3Ready']();

      expect(clearTimeout).toHaveBeenCalledTimes(1);
      await expect(promise).resolves.toBe(undefined);
    });
  });
});

describe('test version comparison functions', () => {
  test('compareVersionNumbers', () => {
    expect(compareVersionNumbers('1.1', '1.2')).toBe(-1);
    expect(compareVersionNumbers('1.2', '1.1')).toBe(1);
    expect(compareVersionNumbers('1.2', '1.2')).toBe(0);
    expect(compareVersionNumbers('1.1.1', '1.2')).toBe(-1);
    expect(compareVersionNumbers('1.1.1', '1.1')).toBe(1);
    expect(compareVersionNumbers('1.1', '1.1.1')).toBe(-1);
    expect(compareVersionNumbers('1.1.1', '1.1.1')).toBe(0);
  });

  test('versionIsAtLeast', () => {
    const metaOneTwo: ImplementationMetadata = {
      fdc3Version: '1.2',
      provider: 'test',
    };
    expect(versionIsAtLeast(metaOneTwo, '1.1')).toBe(true);
    expect(versionIsAtLeast(metaOneTwo, '1.2')).toBe(true);
    expect(versionIsAtLeast(metaOneTwo, '1.2.1')).toBe(false);
    expect(versionIsAtLeast(metaOneTwo, '2.0')).toBe(false);

    const metaOneTwoOne: ImplementationMetadata = {
      fdc3Version: '1.2.1',
      provider: 'test',
    };
    expect(versionIsAtLeast(metaOneTwoOne, '1.1')).toBe(true);
    expect(versionIsAtLeast(metaOneTwoOne, '1.2')).toBe(true);
    expect(versionIsAtLeast(metaOneTwoOne, '1.2.1')).toBe(true);
    expect(versionIsAtLeast(metaOneTwoOne, '2.0')).toBe(false);
  });
});
