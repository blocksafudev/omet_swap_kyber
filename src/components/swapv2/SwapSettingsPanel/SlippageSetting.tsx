import { Trans, t } from '@lingui/macro'
import React from 'react'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'

import SlippageControl from 'components/SlippageControl'
import { MouseoverTooltip, TextDashed } from 'components/Tooltip'
import PinButton from 'components/swapv2/SwapSettingsPanel/PinButton'
import { DEFAULT_SLIPPAGE, DEFAULT_SLIPPAGE_STABLE_PAIR_SWAP } from 'constants/index'
import useTheme from 'hooks/useTheme'
import { useCheckCorrelatedPair, useCheckStablePairSwap } from 'state/swap/hooks'
import { useSlippageSettingByPage } from 'state/user/hooks'
import { ExternalLink } from 'theme'
import { SLIPPAGE_STATUS, checkRangeSlippage } from 'utils/slippage'

const Message = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;

  &[data-warning='true'] {
    color: ${({ theme }) => theme.warning};
  }

  &[data-error='true'] {
    color: ${({ theme }) => theme.red1};
  }
`

type Props = {
  shouldShowPinButton?: boolean
}

const SlippageSetting: React.FC<Props> = ({ shouldShowPinButton = true }) => {
  const { rawSlippage, setRawSlippage, isSlippageControlPinned, togglePinSlippage } = useSlippageSettingByPage()

  const isStablePairSwap = useCheckStablePairSwap()
  const isCorrelatedPair = useCheckCorrelatedPair()
  const slippageStatus = checkRangeSlippage(rawSlippage, isStablePairSwap, isCorrelatedPair)
  const isWarning = slippageStatus !== SLIPPAGE_STATUS.NORMAL
  const theme = useTheme()

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        rowGap: '8px',
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
        }}
      >
        <TextDashed fontSize={12} fontWeight={400} color={theme.subText} underlineColor={theme.border}>
          <MouseoverTooltip
            text={
              <Text>
                <Trans>
                  During your swap if the price changes by more than this %, your transaction will revert. Read more{' '}
                  <ExternalLink href="https://docs.metti.com/getting-started/foundational-topics/decentralized-finance/slippage">
                    here ↗
                  </ExternalLink>
                  .
                </Trans>
              </Text>
            }
            placement="right"
          >
            <Trans>Max Slippage</Trans>
          </MouseoverTooltip>
        </TextDashed>

        {shouldShowPinButton && <PinButton isActive={isSlippageControlPinned} onClick={togglePinSlippage} />}
      </Flex>

      <SlippageControl
        rawSlippage={rawSlippage}
        setRawSlippage={setRawSlippage}
        isWarning={isWarning}
        defaultRawSlippage={isStablePairSwap ? DEFAULT_SLIPPAGE_STABLE_PAIR_SWAP : DEFAULT_SLIPPAGE}
      />

      {isWarning && (
        <Message data-warning={true} data-error={false}>
          {slippageStatus === SLIPPAGE_STATUS.HIGH
            ? isStablePairSwap
              ? t`Your slippage setting might be high compared to typical stable pair trades. Consider adjusting it to reduce the risk of front-running.`
              : isCorrelatedPair
              ? t`Your slippage setting might be high compared with other similar trades. You might want to adjust it to avoid potential front-running.`
              : t`Your slippage setting might be high. You might want to adjust it to avoid potential front-running.`
            : t`Slippage is low. Your transaction may fail.`}
        </Message>
      )}
    </Flex>
  )
}

export default SlippageSetting
