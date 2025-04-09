import { Trans } from '@lingui/macro'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'

import { Telegram } from 'components/Icons'
import Discord from 'components/Icons/Discord'
import PoweredByIconDark from 'components/Icons/PoweredByIconDark'
import TwitterIcon from 'components/Icons/TwitterIcon'
import { KYBER_NETWORK_DISCORD_URL, KYBER_NETWORK_TWITTER_URL } from 'constants/index'
import useTheme from 'hooks/useTheme'
import { ExternalLink, ExternalLinkNoLineHeight } from 'theme'

const FooterWrapper = styled.div`
  background: ${({ theme }) => theme.buttonGray + '33'};
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-bottom: 4rem;
  `};
`

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  width: 100%;
  padding: 16px;
  flex-direction: column-reverse;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    padding: 16px 16px;
  }

  @media only screen and (min-width: 1000px) {
    padding: 16px 32px;
  }

  @media only screen and (min-width: 1366px) {
    padding: 16px 215px;
  }

  @media only screen and (min-width: 1500px) {
    padding: 16px 100px;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.subText + '33'};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 16px;
    gap: 24px;
  `};
`

const Item = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.subText};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

export const FooterSocialLink = () => {
  const theme = useTheme()
  return (
    <Flex alignItems="center" justifyContent="center" sx={{ gap: '24px' }}>
      <ExternalLinkNoLineHeight href="https://t.me/">
        <Telegram size={16} color={theme.subText} />
      </ExternalLinkNoLineHeight>
      <ExternalLinkNoLineHeight href={KYBER_NETWORK_TWITTER_URL}>
        <TwitterIcon color={theme.subText} />
      </ExternalLinkNoLineHeight>
      <ExternalLinkNoLineHeight href={KYBER_NETWORK_DISCORD_URL}>
        <Discord width={16} height={12} color={theme.subText} />
      </ExternalLinkNoLineHeight>
    </Flex>
  )
}

function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <InfoWrapper>
          <Item>
            <Text marginRight="6px">
              <Trans>Powered By</Trans>
            </Text>
            <ExternalLink href="https://metti.io" style={{ display: 'flex' }}>
              <PoweredByIconDark width={48} />
            </ExternalLink>
          </Item>
        </InfoWrapper>
        <FooterSocialLink />
      </FooterContent>
    </FooterWrapper>
  )
}

export default Footer
