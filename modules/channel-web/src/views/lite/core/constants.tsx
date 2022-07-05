export default {
  /** These types are sent using the /message/ endpoint */
  MESSAGE_TYPES: ['text', 'quick_reply', 'form', 'login_prompt', 'visit', 'postback'],
  /** The duration of the hide / show chat */
  ANIM_DURATION: 300,
  MIN_TIME_BETWEEN_SOUNDS: 1000,
  HISTORY_STARTING_POINT: -1,
  HISTORY_MAX_MESSAGES: 10,
  /** The number of minutes before a new timestamp is displayed */
  TIME_BETWEEN_DATES: 10,
  DEFAULT_LAYOUT_WIDTH: 380,
  DEFAULT_CONTAINER_WIDTH: 380,
  DEFAULT_MAX_LAYOUT_WIDTH: 422,
  DEFAULT_MAX_CONTAINER_WIDTH: 422,
  SENT_HISTORY_SIZE: 20,
  /** The default configuration when starting the chat */
  DEFAULT_CONFIG: {
    userId: undefined,
    extraStylesheet: '',
    botName: undefined,
    botNameUrl: '/assets/modules/channel-web/images/BI.png',
    avatarUrl: '/assets/modules/channel-web/images/Profile.png',
    botConvoDescription: undefined,
    overrides: undefined,
    enableReset: true,
    enableTranscriptDownload: true,
    enableArrowNavigation: false,
    showConversationsButton: true,
    showResizeLayoutHeightButton: true,
    useSessionStorage: false,
    showUserName: false,
    showUserAvatar: false,
    hideBotAvatar: true,
    showTimestamp: true,
    disableAnimations: false,
    hideWidget: false,
    widgetMode: 'hypercloud',
    externalAuthToken: undefined,
    // showPoweredBy: window.SHOW_POWERED_BY,  /** PoweredBy 안보이도록 초기화 */
    enablePersistHistory: true,
    enableResetSessionShortcut: false,
    enableVoiceComposer: false,
    enableConversationDeletion: false,
    closeOnEscape: true
  }
}
