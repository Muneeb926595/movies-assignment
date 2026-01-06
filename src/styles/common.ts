/**
 * Common Styled Components
 * Reusable styled components following best practices
 */

import styled from 'styled-components/native';
import { wp, hp, rf } from '../theme/styled-utils';

/**
 * Layout Components
 */

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Column = styled.View`
  flex-direction: column;
`;

export const Center = styled.View`
  justify-content: center;
  align-items: center;
`;

export const SpaceBetween = styled(Row)`
  justify-content: space-between;
`;

export const Spacer = styled.View<{ size?: number }>`
  height: ${props => props.size || props.theme.spacing.medium}px;
  width: ${props => props.size || props.theme.spacing.medium}px;
`;

/**
 * Card Components
 */

export const Card = styled.View`
  background-color: ${props => props.theme.colors.surface.DEFAULT};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.medium}px;
  margin-bottom: ${props => props.theme.spacing.small}px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.18;
  shadow-radius: 1px;
  elevation: 2;
`;

export const CardHeader = styled(Row)`
  margin-bottom: ${props => props.theme.spacing.small}px;
  justify-content: space-between;
`;

export const CardBody = styled.View`
  flex: 1;
`;

export const CardFooter = styled(Row)`
  margin-top: ${props => props.theme.spacing.small}px;
  justify-content: space-between;
  align-items: center;
`;

/**
 * Text Components
 */

export const H1 = styled.Text`
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
  font-size: ${rf(32)}px;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small}px;
`;

export const H2 = styled.Text`
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
  font-size: ${rf(28)}px;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small}px;
`;

export const H3 = styled.Text`
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
  font-size: ${rf(24)}px;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small}px;
`;

export const H4 = styled.Text`
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
  font-size: ${rf(20)}px;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.micro}px;
`;

export const H5 = styled.Text`
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
  font-size: ${rf(18)}px;
  color: ${props => props.theme.colors.text};
`;

export const H6 = styled.Text`
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
  font-size: ${rf(16)}px;
  color: ${props => props.theme.colors.text};
`;

export const BodyText = styled.Text`
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.text};
  line-height: ${rf(20)}px;
`;

export const SmallText = styled.Text`
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  font-size: ${rf(12)}px;
  color: ${props => props.theme.colors.muted};
`;

export const TinyText = styled.Text`
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  font-size: ${rf(10)}px;
  color: ${props => props.theme.colors.muted};
`;

export const BoldText = styled.Text`
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.text};
`;

export const LinkText = styled.Text`
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.brand.DEFAULT};
  text-decoration-line: underline;
`;

/**
 * Button Components
 */

export const PrimaryButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.surface[100]
      : props.theme.colors.brand.DEFAULT};
  padding-vertical: ${hp(2)}px;
  padding-horizontal: ${wp(8)}px;
  border-radius: ${wp(2)}px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.18;
  shadow-radius: 1px;
  elevation: 2;
`;

export const SecondaryButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props => props.theme.colors.surface.DEFAULT};
  border-width: 1px;
  border-color: ${props =>
    props.disabled
      ? props.theme.colors.borders[100]
      : props.theme.colors.brand.DEFAULT};
  padding-vertical: ${hp(2)}px;
  padding-horizontal: ${wp(8)}px;
  border-radius: ${wp(2)}px;
  align-items: center;
  justify-content: center;
`;

export const OutlineButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${props => props.theme.colors.borders.DEFAULT};
  padding-vertical: ${hp(1.5)}px;
  padding-horizontal: ${wp(6)}px;
  border-radius: ${wp(2)}px;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled.TouchableOpacity`
  width: ${wp(12)}px;
  height: ${wp(12)}px;
  border-radius: ${wp(6)}px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.surface[50]};
`;

export const ButtonText = styled.Text<{ variant?: 'primary' | 'secondary' }>`
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
  font-size: ${rf(16)}px;
  color: ${props =>
    props.variant === 'secondary'
      ? props.theme.colors.brand.DEFAULT
      : props.theme.colors.white};
`;

/**
 * Input Components
 */

export const Input = styled.TextInput`
  background-color: ${props => props.theme.colors.surface.DEFAULT};
  border-width: 1px;
  border-color: ${props => props.theme.colors.borders.DEFAULT};
  border-radius: ${wp(2)}px;
  padding-horizontal: ${wp(4)}px;
  padding-vertical: ${hp(1.5)}px;
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.text};
`;

export const InputLabel = styled.Text`
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.micro}px;
`;

export const InputError = styled.Text`
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  font-size: ${rf(12)}px;
  color: ${props => props.theme.colors.red};
  margin-top: ${props => props.theme.spacing.micro}px;
`;

/**
 * List Components
 */

export const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${props => props.theme.spacing.medium}px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.borders[100]};
`;

export const ListItemText = styled.Text`
  flex: 1;
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.text};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.borders.DEFAULT};
  margin-vertical: ${props => props.theme.spacing.small}px;
`;

/**
 * Badge Components
 */

export const Badge = styled.View<{
  variant?: 'primary' | 'success' | 'warning' | 'error';
}>`
  background-color: ${props => {
    switch (props.variant) {
      case 'success':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'error':
        return props.theme.colors.red;
      default:
        return props.theme.colors.brand.DEFAULT;
    }
  }};
  padding-horizontal: ${wp(3)}px;
  padding-vertical: ${hp(0.5)}px;
  border-radius: ${wp(3)}px;
  align-self: flex-start;
`;

export const BadgeText = styled.Text`
  font-family: ${props => props.theme.fonts.latoSemiBold.fontFamily};
  font-size: ${rf(10)}px;
  color: ${props => props.theme.colors.white};
`;

/**
 * Modal Components
 */

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.modalBackground};
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${props => props.theme.colors.background};
  border-radius: 16px;
  padding: ${props => props.theme.spacing.large}px;
  width: ${wp(85)}px;
  max-height: ${hp(80)}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ModalHeader = styled(Row)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.medium}px;
`;

export const ModalTitle = styled.Text`
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
  font-size: ${rf(20)}px;
  color: ${props => props.theme.colors.text};
`;

export const ModalBody = styled.View`
  flex: 1;
`;

export const ModalFooter = styled(Row)`
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.medium}px;
  gap: ${props => props.theme.spacing.small}px;
`;

/**
 * Avatar Components
 */

export const Avatar = styled.View<{ size?: number }>`
  width: ${props => props.size || 40}px;
  height: ${props => props.size || 40}px;
  border-radius: ${props => (props.size || 40) / 2}px;
  background-color: ${props => props.theme.colors.surface[100]};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const AvatarText = styled.Text`
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
  font-size: ${rf(16)}px;
  color: ${props => props.theme.colors.white};
`;

/**
 * Loading Components
 */

export const LoadingContainer = styled(Center)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const LoadingText = styled.Text`
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.muted};
  margin-top: ${props => props.theme.spacing.small}px;
`;

/**
 * Empty State Components
 */

export const EmptyStateContainer = styled(Center)`
  flex: 1;
  padding: ${props => props.theme.spacing.large}px;
`;

export const EmptyStateTitle = styled.Text`
  font-family: ${props => props.theme.fonts.latoBold.fontFamily};
  font-size: ${rf(18)}px;
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.spacing.medium}px;
  text-align: center;
`;

export const EmptyStateMessage = styled.Text`
  font-family: ${props => props.theme.fonts.latoRegular.fontFamily};
  font-size: ${rf(14)}px;
  color: ${props => props.theme.colors.muted};
  margin-top: ${props => props.theme.spacing.small}px;
  text-align: center;
`;
