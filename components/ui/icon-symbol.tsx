// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = SymbolViewProps['name'] | string;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: IconMapping = {
  // Navigation & basic
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'arrow.left': 'arrow-back',
  'arrow.right.circle.fill': 'arrow-forward',
  'arrow.right.square.fill': 'arrow-forward',
  'arrow.up.arrow.down': 'swap-vert',
  'xmark': 'close',
  'xmark.circle': 'cancel',
  'xmark.circle.fill': 'cancel',

  // Status & feedback
  'sparkles': 'star',
  'star.fill': 'star',
  'exclamationmark.circle.fill': 'error-outline',
  'checkmark.circle.fill': 'check-circle',
  'minus.circle.fill': 'remove-circle',
  'plus.circle.fill': 'add-circle',
  'plus.circle': 'add-circle-outline',
  'questionmark.circle.fill': 'help-outline',

  // People & auth
  'person.crop.circle': 'person',
  'person.crop.circle.fill': 'person',
  'person.circle.fill': 'account-circle',
  'person.fill': 'person',
  'person.2.fill': 'group',
  'person.badge.plus.fill': 'person-add',
  'g.circle.fill': 'google',
  'f.circle.fill': 'facebook',
  'apple.logo': 'apple',

  // Commerce
  'cart.fill': 'shopping-cart',
  'cart': 'shopping-cart',
  'bag.fill': 'shopping-bag',
  'bag': 'shopping-bag',
  'creditcard': 'credit-card',
  'creditcard.fill': 'credit-card',
  'banknote': 'payments',
  'tag.fill': 'local-offer',
  'gift.fill': 'card-giftcard',
  'list.clipboard': 'checklist',

  // Finance & budget
  'indianrupeesign.circle.fill': 'currency-rupee',
  'indianrupeesign': 'currency-rupee',
  'chart.bar.fill': 'bar-chart',
  'chart.bar': 'bar-chart',
  'line.3.horizontal.decrease.circle': 'filter-list',

  // Media & camera
  'camera.fill': 'photo-camera',
  'camera.viewfinder': 'photo-camera',
  'photo.badge.plus': 'add-a-photo',
  'image': 'image',

  // Decoration / AR specific
  'cube.transparent': 'view-in-ar',
  'cube.fill': 'view-in-ar',
  'wand.and.stars': 'auto-awesome',
  'wand.and.stars.inverse': 'auto-awesome',
  'paintpalette.fill': 'palette',
  'paintpalette': 'palette',

  // Text & docs
  'doc.text.fill': 'description',
  'text.bubble.fill': 'sms',

  // Communication
  'envelope.fill': 'email',
  'phone.fill': 'phone',
  'phone.bubble.left.fill': 'support-agent',
  'message.fill': 'message',
  'headphones': 'headset-mic',
  'globe': 'language',
  'bell.fill': 'notifications',
  'app.badge.fill': 'apps',

  // Interface & misc
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  'magnifyingglass': 'search',
  'location.fill': 'place',
  'mappin.circle.fill': 'place',
  'location.circle.fill': 'place',
  'lock.fill': 'lock',
  'lock.shield.fill': 'security',
  'info.circle.fill': 'info',
  'calendar': 'calendar-today',
  'calendar.badge.checkmark': 'event-available',
  'building.columns': 'account-balance',
  'building.2.fill': 'apartment',
  'pencil': 'edit',
  'trash': 'delete',
  'trash.fill': 'delete',
  'plus': 'add',
  'minus': 'remove',
  'arrow.clockwise': 'refresh',
  'arrow.clockwise.circle.fill': 'refresh',
  'arrow.counterclockwise': 'refresh',
  'link': 'link',
  'eye': 'visibility',
  'bell': 'notifications',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mappedName = MAPPING[name] ?? 'circle';
  return <MaterialIcons color={color} size={size} name={mappedName} style={style} />;
}
