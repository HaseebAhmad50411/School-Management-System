<template>
  <q-header style="height: 5%" class="bg-white q-pa-sm">
    <div class="row justify-between">
      <div class="col-3 text-h5 text-bold text-teal-10">Dashboard</div>

      <div class="col-6">
        <div class="row text-black">
          <div class="col"></div>
          <div class="col-5 q-mx-md q-pb-md">
            <q-input borderless outlined rounded dense label="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-2">
            <q-btn class="button q-mx-sm" rounded color="green-1">
              <q-icon color="grey-8" name="chat" />
            </q-btn>
            <q-btn class="button q-mx-sm" rounded color="green-1">
              <q-icon color="grey-8" name="notifications" />
            </q-btn>
          </div>

          <div class="col-2">
            <div class="text-bold">Andrew Forbist</div>
            <div style="font-size: smaller">Admin</div>
          </div>
          <div class="col-1">
            <q-btn
              class="button"
              rounded
              disabled
              icon="account_circle"
              color="light-green-13"
            />
          </div>
        </div>
      </div>
    </div>
  </q-header>
  <div class="row">
    <div class="col-3">
      <q-card
        style="border-radius: 7%"
        class="col-2 bg-teal-10 text-white q-ma-md"
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
            <div class="col-2 q-pl-md">
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
              <div class="row q-pt-md q-ml-xl q-pl-xl">
                <div class="col q-pa-none q-my-none q-mr-sm">
                  <p style="font-size: smaller" class="q-pa-none q-ma-none">
                    EXP
                  </p>
                  <p
                    style="font-size: smaller"
                    class="text-bold q-pa-none q-ma-none"
                  >
                    11/29
                  </p>
                </div>
                <div class="col q-ml-sm">
                  <p style="font-size: smaller" class="q-pa-none q-ma-none">
                    CVV
                  </p>
                  <p
                    style="font-size: smaller"
                    class="text-bold q-pa-none q-ma-none"
                  >
                    323
                  </p>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="row bg-green-1 q-pa-sm">
        <q-card clickable class="col-3 bg-green-1 text-center no-box-shadow">
          <q-card-image>
            <q-icon size="large" name="add_box" />
          </q-card-image>
          <q-card-section
            style="font-size: smaller"
            class="q-ma-none q-pa-none"
          >
            Top up
          </q-card-section>
        </q-card>
        <q-card clickable class="col-3 bg-green-1 text-center no-box-shadow">
          <q-card-image>
            <q-icon size="large" name="currency_exchange" />
          </q-card-image>
          <q-card-section
            style="font-size: smaller"
            class="q-ma-none q-pa-none"
          >
            Transfer
          </q-card-section>
        </q-card>
        <q-card clickable class="col-3 bg-green-1 text-center no-box-shadow">
          <q-card-image>
            <q-icon size="large" name="request_page" />
          </q-card-image>
          <q-card-section
            style="font-size: smaller"
            class="q-ma-none q-pa-none"
          >
            Request
          </q-card-section>
        </q-card>
        <q-card clickable class="col-3 bg-green-1 text-center no-box-shadow">
          <q-card-image>
            <q-icon size="large" name="history" />
          </q-card-image>
          <q-card-section
            style="font-size: smaller"
            class="q-ma-none q-pa-none"
          >
            History
          </q-card-section>
        </q-card>
      </div>
      <div class="q-ma-sm">
        <q-card>
          <q-card-section class="q-ma-sm q-pa-sm">
            <div class="row justify-between">
              <div class="col-4 text-bold">Daily Limit</div>
              <div class="col-1 q-pl-md">
                <q-icon name="more_vert" />
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-ma-sm q-pa-sm">
            <div class="row justify-between">
              <div class="col-10">
                <p class="text-bold">
                  $2,500.00
                  <sub style="font-weight: lighter">spent of $20,000.00</sub>
                </p>
              </div>
              <div class="col-1 q-mx-sm text-bold">12.5%</div>
            </div>
            <div>
              <q-linear-progress
                :value="progress"
                rounded
                color="teal-10"
                track-color="green"
                class="q-my-sm"
                size="8px"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-ma-sm">
        <q-card>
          <q-card-section class="q-ma-sm q-pa-sm">
            <div class="row justify-between">
              <div class="col-5 text-bold">Saving Plans</div>
              <div style="font-size: smaller" class="col-4 q-pl-sm">
                Add PLan
                <q-icon size="medium" name="add" />
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-ma-sm q-pa-sm">
            <div style="font-size: smaller">Total Savings</div>
            <div class="text-bold text-h5 text-teal-10">$84,500</div>
          </q-card-section>
          <q-card-section class="q-ma-xs q-pa-none">
            <q-card bordered>
              <q-card-section class="q-ma-sm q-pa-sm">
                <div class="row justify-between">
                  <div class="col-6 text-bold">
                    <div class="row">
                      <q-btn
                        class="col-1"
                        style="font-size: 70%"
                        size="0.8em"
                        rounded
                        color="grey-6"
                        icon="report_problem"
                      />

                      <div class="col q-ml-sm q-pt-xs">Emergency Fund</div>
                    </div>
                  </div>
                  <div class="col-1 q-pl-md">
                    <q-icon name="more_vert" />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-ma-sm q-pa-sm">
                <div>
                  <q-linear-progress
                    :value="progress"
                    rounded
                    color="teal-10"
                    track-color="green"
                    class="q-my-sm"
                    size="8px"
                  />
                </div>
                <div class="row justify-between">
                  <div class="col-5">
                    <div class="row">
                      <p class="col text-bold">$5,000</p>

                      <p class="col q-mr-sm q-pr-lg">50%</p>
                    </div>
                  </div>
                  <div style="font-size: small" class="col-4">
                    Target $10,000
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <q-card-section class="q-ma-xs q-pa-none">
            <q-card bordered>
              <q-card-section class="q-ma-sm q-pa-sm">
                <div class="row justify-between">
                  <div class="col-6 text-bold">
                    <div class="row">
                      <q-btn
                        class="col-1"
                        style="font-size: 70%"
                        size="0.8em"
                        rounded
                        color="grey-6"
                        icon="flight_takeoff"
                      />

                      <div class="col q-ml-sm q-pt-xs">Vacation Fund</div>
                    </div>
                  </div>
                  <div class="col-1 q-pl-md">
                    <q-icon name="more_vert" />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-ma-sm q-pa-sm">
                <div>
                  <q-linear-progress
                    :value="progress"
                    rounded
                    color="teal-10"
                    track-color="green"
                    class="q-my-sm"
                    size="8px"
                  />
                </div>
                <div class="row justify-between">
                  <div class="col-5">
                    <div class="row">
                      <p class="col text-bold">$3,000</p>

                      <p class="col q-mr-sm q-pr-lg">60%</p>
                    </div>
                  </div>
                  <div style="font-size: small" class="col-4">
                    Target $5,000
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <q-card-section class="q-ma-xs q-pa-none">
            <q-card bordered>
              <q-card-section class="row justify-between q-ma-sm q-pa-sm">
                <div class="col-8 text-bold">
                  <div class="row">
                    <q-btn
                      class="col-1"
                      style="font-size: 70%"
                      size="0.8em"
                      rounded
                      color="grey-6"
                      icon="home"
                    />

                    <div class="col q-ml-sm q-pt-xs">Home Down Payment</div>
                  </div>
                </div>
                <div class="col-1 q-pl-md">
                  <q-icon name="more_vert" />
                </div>
              </q-card-section>
              <q-card-section class="q-ma-sm q-pa-sm">
                <div>
                  <q-linear-progress
                    :value="progress"
                    rounded
                    color="teal-10"
                    track-color="green"
                    class="q-my-sm"
                    size="8px"
                  />
                </div>
                <div class="row justify-between">
                  <div class="col-5">
                    <div class="row">
                      <p class="col text-bold">$7,250</p>

                      <p class="col q-mr-sm q-pr-lg">36.25%</p>
                    </div>
                  </div>
                  <div style="font-size: small" class="col-4">
                    Target $20,000
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-6">
      <div class="row q-ma-sm">
        <div class="col-4">
          <q-card class="q-ma-sm">
            <q-card-section>
              <div class="row justify-between">
                <div class="col-1">
                  <q-btn
                    style="width: 10%"
                    color="grey-8"
                    rounded
                    size="small"
                    icon="request_page"
                  />
                </div>
                <div class="col-1 q-pl-md">
                  <q-icon size="large" name="more_vert" />
                </div>
              </div>
            </q-card-section>
            <q-card-section class="row">
              <div
                style="font-size: 60%; border-radius: 30%"
                class="col-16 bg-light-green-13"
              >
                <q-icon name="trending_up" /> +178%
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-h5 text-bold">$78,000</div>
              <sub class="text-grey-7">Total Income</sub>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="q-ma-sm">
            <q-card-section>
              <div class="row justify-between">
                <div class="col-1">
                  <q-btn
                    style="width: 10%"
                    color="grey-8"
                    rounded
                    size="small"
                    icon="request_page"
                  />
                </div>
                <div class="col-1 q-pl-md">
                  <q-icon size="large" name="more_vert" />
                </div>
              </div>
            </q-card-section>
            <q-card-section class="row">
              <div
                style="font-size: 60%; border-radius: 30%"
                class="col-16 bg-red-2 text-red"
              >
                <q-icon name="trending_down" /> -178%
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-h5 text-bold">$43,000</div>
              <sub class="text-grey-7">Total Expense</sub>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="q-ma-sm">
            <q-card-section>
              <div class="row justify-between">
                <div class="col-1">
                  <q-btn
                    style="width: 10%"
                    color="grey-8"
                    rounded
                    size="small"
                    icon="folder_open"
                  />
                </div>
                <div class="col-1 q-pl-md">
                  <q-icon size="large" name="more_vert" />
                </div>
              </div>
            </q-card-section>
            <q-card-section class="row">
              <div
                style="font-size: 60%; border-radius: 30%"
                class="col-16 bg-light-green-13"
              >
                <q-icon name="trending_up" /> +178%
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-h5 text-bold">$56,000</div>
              <sub class="text-grey-7">Total Savings</sub>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="col-12 q-pa-sm">
          <q-card>
            <q-card-section class="row justify-between">
              <div class="text-grey-8 text-h6 col-2 text-weight-bolder">
                Cashflow
              </div>
              <q-select outlined dense class="col-2" label="This Year" />
            </q-card-section>
            <q-card-section>
              <div class="row justify-between">
                <div class="col-4">
                  <div>Total Balance</div>
                  <div class="text-teal-10 text-h5 text-bold">$562,000</div>
                </div>
                <div class="col-4">
                  <div class="row">
                    <div class="col">
                      <q-checkbox color="teal-10" />
                      Income
                    </div>
                    <div class="col">
                      <q-checkbox color="light-green-13" />
                      Expense
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="relative-position">
              <div class="row q-ma-sm">
                <div class="q-mr-sm">8k</div>
                <div class="col">
                  <hr />
                </div>
              </div>
              <div class="row q-ma-sm">
                <div class="q-mr-sm">4k</div>
                <div class="col">
                  <hr />
                </div>
              </div>
              <div class="row q-ma-sm">
                <div class="q-mr-sm">0</div>
                <div class="col">
                  <hr />
                </div>
              </div>
              <div class="row q-ma-sm">
                <div class="q-mr-sm">-4k</div>
                <div class="col">
                  <hr />
                </div>
              </div>
              <div class="row q-ma-sm">
                <div class="q-mr-sm">-8k</div>
                <div class="col">
                  <hr />
                </div>
              </div>
              <div class="row"></div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DashboardPage",
  setup() {
    const progress = ref(0.12);
    return {
      progress,
      randomize() {
        progress.value = Math.random();
      },
    };
  },
});
</script>
<style scoped>
.button {
  width: 10%;
  font-size: small;
}
</style>
