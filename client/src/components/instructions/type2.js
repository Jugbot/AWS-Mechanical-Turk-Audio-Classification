export default [`
  <p>In this task we want you to help us identify if there is a jackhammer present in audio recordings. You will be presented with 20 sound files for which you should answer two questions:</p>
  <ol>
    <li>Is there a jackhammer present in the recording?</li>
    <li>You have the chance to win a dollar in one of the following ways (choose one): 1) by lottery (X% chance of winning), or 2) if my answer to the question about the presence of a jackhammer is correct.</li>
  </ol>`,

  `<p>For example:</p>
  <div class="v-card v-sheet theme--light"><div class="v-card__title"><span>Is there a(n) jackhammer present in the recording?</span></div><hr class="v-divider theme--light"><div class="v-card__actions" style=""><div class="v-input v-input--selection-controls v-input--radio-group v-input--radio-group--row v-input--is-label-active v-input--is-dirty v-input--is-disabled theme--light"><div class="v-input__control"><div class="v-input__slot" style="height: auto;"><div role="radiogroup" class="v-input--radio-group__input"><div class="v-radio v-radio--is-disabled theme--light accent--text"><div class="v-input--selection-controls__input"><input aria-label="Yes" aria-checked="true" role="radio" type="radio" value="true" disabled="disabled"><div class="v-input--selection-controls__ripple accent--text"></div><i aria-hidden="true" class="v-icon material-icons theme--light accent--text">radio_button_checked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">Yes</label></div><div class="v-radio v-radio--is-disabled theme--light"><div class="v-input--selection-controls__input"><input aria-label="No" aria-checked="false" role="radio" type="radio" value="false" disabled="disabled"><div class="v-input--selection-controls__ripple"></div><i aria-hidden="true" class="v-icon material-icons theme--light">radio_button_unchecked</i></div><label aria-hidden="true" class="v-label theme--light" style="left: 0px; right: auto; position: relative;">No</label></div></div></div><div class="v-messages theme--light"><div class="v-messages__wrapper"></div></div></div></div></div></div>`,

  `<p>Question #2 will be asked 5 times for each recording, progressively varying the chances of winning the lottery from 50% to 90%. Each of these options will happen only once. After the fifth round has been played, the round for payment will be chosen at random. </p>`,

  `<p>You must answer these questions based on the confidence of your answer.</p>
  <p>For example you choose:</p>
  <div class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled  v-btn--flat"><div class="v-btn__content">50% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>`,

  `<p>The chance for a win in a lottery now has risen by 10%. Would we take the better lottery option or stick with our answer?</p>
  <div class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled  v-btn--flat"><div class="v-btn__content">60% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>`,

  `<p>Now the odds have gotten to the point where we would rather take our chances with the lottery for the remaining rounds.</p>
  <div style="margin-top:16px;" class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content">70% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--flat"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>
  <div style="margin-top:16px;" class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content">80% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--flat"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>
  <div style="margin-top:16px;" class="v-card v-sheet theme--light"><div class="v-card__actions layout justify-space-around row wrap"><button type="button" class="theme--light v-btn v-btn--disabled v-btn--outline"><div class="v-btn__content">90% chance lottery</span></div></button><button type="button" class="theme--light v-btn v-btn--disabled v-btn--flat"><div class="v-btn__content"><span>My answer to the question about the presence of a jackhammer</span></div></button></div></div>`,

  `<p>The round for payment will be selected at random from rounds 1-5, let&rsquo;s say round 2 was selected (the one where your answer was chosen). If your answer was correct, you would have won a dollar, if you answer was incorrect, you would not have won.</p>
  <p>If on the other hand, round 4 was selected, there was an 80% chance of winning a dollar and 20% chance of getting nothing. If we run the lottery and you win, you get one dollar.</p>
  <p>You will play for the chance of winning up to $20 in bonus, $1 per recording.</p>`]
