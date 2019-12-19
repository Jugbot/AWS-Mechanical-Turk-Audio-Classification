export default [`
  <p>In this task we want you to help us identify if there is a jackhammer present in audio recordings. You will be presented with 20 sound files for which you should answer two questions:</p>
  <ol>
    <li>Is there a jackhammer present in the recording?</li>
    <li>How confident are you with your answer?</li>
  </ol>`,

  `<p>For example:</p>
  <div class="v-card v-sheet theme--light"><div class="v-card__title"><span>Is there a(n) jackhammer present in the recording?</span></div><hr class="v-divider theme--light"><div class="v-card__actions" style=""><div class="v-input v-input--selection-controls v-input--radio-group v-input--radio-group--row v-input--is-label-active v-input--is-dirty v-input--is-disabled theme--light"><div class="v-input__control"><div class="v-input__slot" style="height: auto;"><div role="radiogroup" class="v-input--radio-group__input"><div class="v-radio v-radio--is-disabled theme--light accent--text"><div class="v-input--selection-controls__input"><input aria-label="Yes" aria-checked="true" role="radio" type="radio" value="true" disabled="disabled"><div class="v-input--selection-controls__ripple accent--text"></div><i aria-hidden="true" class="v-icon material-icons theme--light accent--text">radio_button_checked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">Yes</label></div><div class="v-radio v-radio--is-disabled theme--light"><div class="v-input--selection-controls__input"><input aria-label="No" aria-checked="false" role="radio" type="radio" value="false" disabled="disabled"><div class="v-input--selection-controls__ripple"></div><i aria-hidden="true" class="v-icon material-icons theme--light">radio_button_unchecked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">No</label></div></div></div><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div></div></div></div>`,

  `<p>For question #2 you should answer the question <b>How confident are you that there is a jackhammer present in the recording?</b> as a percent value using a slider from 0-100 in 10 step intervals.</p>
  <p>For example if I say I am 87% confident I might enter:</p>
  <div class="v-card v-sheet theme--light"><div class="v-card__title">How confident are you that there is a jackhammer present in the recording?</div><hr class="v-divider theme--light"><div class="v-card__actions"><span class="v-tooltip v-input v-tooltip--bottom"><span><div class="v-input v-input--slider v-input--slider--thumb-label v-input--is-label-active v-input--is-dirty theme--light"><div class="v-input__prepend-outer"><span>50%</span></div><div class="v-input__control"><div class="v-input__slot"><div class="v-slider"><input role="slider" value="90" readonly="readonly" aria-readonly="false" aria-valuemin="50" aria-valuemax="100" aria-valuenow="90"><div class="v-slider__track__container"><div class="v-slider__track" style="left: 0px; right: auto; width: 100%;"></div><div class="v-slider__track-fill grey" style="left: 0px; right: auto; width: 80%;"></div></div><div class="v-slider__thumb-container v-slider__thumb-container--show-label grey--text" style="left: 80%;"><div class="v-slider__thumb grey"></div><div class="v-slider__thumb-label__container"><div class="v-slider__thumb-label grey" style="height: 32px; width: 32px;"><span>90</span></div></div></div></div></div><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div><div class="v-input__append-outer"><span>100%</span></div></div></span></span></div></div>`,

  `<p>At the end of each question you may win $0.24 based on whether or not your choice to the question about the presence of a jackhammer is correct or not.</p>
  <p>You will play for the chance of winning up to $4.8 in bonus, $0.24 per recording.</p>`]
