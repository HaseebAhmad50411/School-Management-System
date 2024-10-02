import { Notify, LocalStorage } from "quasar";

export default function notify(
  message = "done",
  type = "success",
  group = true
) {
  let themeColor = "blue";
  const user_theme = LocalStorage.getItem("user_theme");
  if (
    Boolean(user_theme?.color_name) &&
    user_theme.color_name != "white" &&
    user_theme.color_name != "black"
  ) {
    themeColor = "primary-1";
  }

  const color = type == "success" ? themeColor : "negative";
  const icon = type == "success" ? "check_circle" : "cancel";
  const body = `
    <q-card
      flat
      style="display: block; min-width: 400px; max-width: 400px"
    >
      <q-item class="full-width" style="display: block;">
        <q-item-section>
          <q-item-label class="text-h6">
          ${type == "success" ? "Success" : "Error"}!
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-card-section class="full-width" style="display: block;">
        <q-card-section>
          ${message}
        </q-card-section>
      </q-card-section>
    </q-card>
  `;

  Notify.create({
    html: true,
    icon: icon,
    group: group,
    color: color,
    timeout: 3000,
    message: body,
    progress: true,
    position: "bottom",
  });
}
