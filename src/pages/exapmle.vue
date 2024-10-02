<template>
  <div class="row">
    <div
      style="height: 68em"
      class="sidebar relative-position col-2 bg-green-1"
      show-if-above
      bordered
    >
      <div class="row">
        <q-card class="lock-card col-10 bg-teal-10 absolute-bottom">
          <q-card-section class="row">
            <div class="col">
              <q-btn style="background-color: white" icon="lock" />
            </div>
            <div class="col relative-position">
              <q-icon
                color="light-green-12"
                class="card-icon col-2 absolute"
                size="4em"
                name="grid_view"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-mb-sm text-white text-bold">
              Gain full access to your finances with detailed analytics and
              graphs
            </div>

            <q-btn class="text-black" color="light-green-12" label="Access" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="first-column col-6 relative-position bg-white">
      <div>
        <div class="flex flex-end">
          <div class="q-ml-md">
            <h6 class="q-ma-md text-teal-10 text-bold">Dashboard</h6>
          </div>
        </div>
      </div>
      <div class="row">
        <q-card
          style="border-radius: 10%"
          class="col-4 bg-teal-10 text-white q-ma-sm"
        >
          <q-card-section>
            <div class="row justify-between">
              <div class="col-4 q-mr-md">
                <q-icon
                  color="light-green-12"
                  class="col-2"
                  size="2.5em"
                  name="grid_view"
                />
              </div>
              <div class="col-4 q-pl-xl">
                <q-icon
                  color="light-green-12"
                  class="sound-icon col-2"
                  size="2em"
                  name="wifi_tethering"
                />
              </div>
            </div>
            <div class="row q-mb-md q-pb-lg text-bold">
              <div class="col text-h6">Andrew Forbist</div>
            </div>

            <div class="row justify-between">
              <div class="col">
                <p class="q-py-none q-my-none">Balance Amount</p>
                <p class="text-h6 q-py-none q-my-none">$560,000</p>
              </div>
              <div class="col">
                <div class="row q-pt-sm q-pl-xl">
                  <div class="col q-pa-none q-ma-none">
                    <p class="q-pa-none q-ma-none">EXP</p>
                    <p class="text-bold q-pa-none q-ma-none">11/29</p>
                  </div>
                  <div class="col">
                    <p class="q-pa-none q-ma-none">CVV</p>
                    <p class="text-bold q-pa-none q-ma-none">323</p>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="row q-ma-sm">
        <q-card
          clickable
          class="col-1 bg-green-1 text-center q-mr-sm no-box-shadow"
        >
          <q-card-image>
            <q-icon size="large" name="add_box" />
          </q-card-image>
          <q-card-section class="q-ma-none q-pa-none"> Top up </q-card-section>
        </q-card>
        <q-card
          clickable
          class="col-1 bg-green-1 text-center q-mr-sm no-box-shadow"
        >
          <q-card-image>
            <q-icon size="large" name="currency_exchange" />
          </q-card-image>
          <q-card-section class="q-ma-none q-pa-none">
            Transfer
          </q-card-section>
        </q-card>
        <q-card
          clickable
          class="col-1 bg-green-1 text-center q-mr-sm no-box-shadow"
        >
          <q-card-image>
            <q-icon size="large" name="request_page" />
          </q-card-image>
          <q-card-section class="q-ma-none q-pa-none"> Request </q-card-section>
        </q-card>
        <q-card clickable class="col-1 bg-green-1 text-center no-box-shadow">
          <q-card-image>
            <q-icon size="large" name="history" />
          </q-card-image>
          <q-card-section class="q-ma-none q-pa-none"> History </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-3"></div>
    <div class="col"></div>
  </div>
</template>
>
