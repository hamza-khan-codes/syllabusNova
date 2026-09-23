import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Palette,
  Shield,
  Globe,
  Save,
  Camera,
  Mail,
  KeyRound,
  Smartphone,
  Moon,
  Sun,
  Monitor,
  ChevronRight,
  LogOut,
  Trash2,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

const settingsMenu = [
  {
    id: "profile",
    label: "Profile",
    description: "Manage your personal information",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Control your notification preferences",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    description: "Password and account security",
    icon: Lock,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Customize how SyllabusNova looks",
    icon: Palette,
  },
  {
    id: "privacy",
    label: "Privacy",
    description: "Manage your privacy settings",
    icon: Shield,
  },
];

/* =========================================================
   SETTINGS PAGE
========================================================= */

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <MainLayout>

    <div className="min-h-screen bg-background text-foreground">
      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-325 p-5 sm:p-8">
        {/* Header */}

        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Account</p>

          <h1
            className="
              mt-1
              text-2xl font-bold
              tracking-tight
              sm:text-3xl
            "
          >
            Settings
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account, preferences and security.
          </p>
        </div>

        {/* =================================================
            LAYOUT
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[270px_1fr]
          "
        >
          {/* =================================================
              SETTINGS SIDEBAR
          ================================================= */}

          <aside
            className="
              h-fit
              rounded-2xl
              border border-border
              bg-card
              p-2
            "
          >
            {settingsMenu.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    flex w-full
                    items-center gap-3
                    rounded-xl
                    p-3
                    text-left
                    transition
                    ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }
                  `}
                >
                  <div
                    className={`
                      flex size-9
                      shrink-0
                      items-center justify-center
                      rounded-lg
                      ${active ? "bg-primary/15" : "bg-muted"}
                    `}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.label}</p>

                    <p
                      className="
                        mt-0.5
                        hidden
                        truncate
                        text-[10px]
                        text-muted-foreground
                        sm:block
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={15}
                    className={`
                      ${active ? "text-primary" : "text-muted-foreground"}
                    `}
                  />
                </button>
              );
            })}

            {/* Divider */}

            <div className="my-2 border-t border-border" />

            {/* Logout */}

            <button
              className="
                flex w-full
                items-center gap-3
                rounded-xl
                p-3
                text-left
                text-destructive
                transition
                hover:bg-destructive/10
              "
            >
              <div
                className="
                  flex size-9
                  items-center justify-center
                  rounded-lg
                  bg-destructive/10
                "
              >
                <LogOut size={17} />
              </div>

              <span className="text-sm font-medium">Log out</span>
            </button>
          </aside>

          {/* =================================================
              CONTENT
          ================================================= */}

          <section className="min-w-0">
            {activeTab === "profile" && <ProfileSettings />}

            {activeTab === "notifications" && <NotificationSettings />}

            {activeTab === "security" && <SecuritySettings />}

            {activeTab === "appearance" && <AppearanceSettings />}

            {activeTab === "privacy" && <PrivacySettings />}
          </section>
        </div>
      </main>
    </div>
    </MainLayout>
  );
}

/* =========================================================
   PROFILE SETTINGS
========================================================= */

function ProfileSettings() {
  const [name, setName] = useState("Hamza Khan");
  const [username, setUsername] = useState("hamza_khan");
  const [email, setEmail] = useState("hamza@example.com");
  const [bio, setBio] = useState(
    "Student preparing for university entrance exams.",
  );

  return (
    <div className="space-y-6">
      {/* Profile */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-border
          bg-card
        "
      >
        <div className="border-b border-border p-6">
          <h2 className="font-semibold">Profile Information</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Update your personal profile information.
          </p>
        </div>

        <div className="p-6">
          {/* Avatar */}

          <div
            className="
              mb-7
              flex items-center gap-5
            "
          >
            <div
              className="
                relative
                flex size-20
                items-center justify-center
                rounded-full
                bg-primary/15
                text-xl font-bold
                text-primary
              "
            >
              HK
              <button
                className="
                  absolute
                  bottom-0 right-0
                  flex size-7
                  items-center justify-center
                  rounded-full
                  border-2 border-card
                  bg-primary
                  text-primary-foreground
                "
              >
                <Camera size={13} />
              </button>
            </div>

            <div>
              <p className="text-sm font-semibold">Profile Picture</p>

              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG or WebP. Max 2MB.
              </p>

              <button
                className="
                  mt-2
                  text-xs font-medium
                  text-primary
                  hover:underline
                "
              >
                Change photo
              </button>
            </div>
          </div>

          {/* Form */}

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Full Name"
              value={name}
              onChange={setName}
              icon={User}
            />

            <Input label="Username" value={username} onChange={setUsername} />

            <Input
              label="Email Address"
              value={email}
              onChange={setEmail}
              icon={Mail}
              type="email"
            />

            <Input
              label="Phone Number"
              placeholder="+92 XXX XXXXXXX"
              icon={Smartphone}
            />

            <div className="sm:col-span-2">
              <label className="text-xs font-medium">Bio</label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="
                  mt-2
                  w-full
                  resize-none
                  rounded-xl
                  border border-input
                  bg-background
                  px-4 py-3
                  text-sm
                  outline-none
                  placeholder:text-muted-foreground
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            flex justify-end
            border-t border-border
            bg-background/40
            px-6 py-4
          "
        >
          <button
            className="
              flex items-center gap-2
              rounded-lg
              bg-primary
              px-5 py-2.5
              text-sm font-semibold
              text-primary-foreground
              hover:bg-primary/90
            "
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Account info */}

      <div
        className="
          rounded-2xl
          border border-border
          bg-card
          p-6
        "
      >
        <h2 className="font-semibold">Account Information</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <InfoItem label="Account Type" value="Student" />

          <InfoItem label="Member Since" value="August 2026" />

          <InfoItem label="Account Status" value="Active" success />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function NotificationSettings() {
  const [settings, setSettings] = useState({
    testResults: true,
    reminders: true,
    leaderboard: false,
    messages: true,
    newQuizzes: true,
    email: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const options = [
    {
      key: "testResults",
      title: "Test Results",
      description: "Get notified when your test results are ready.",
    },
    {
      key: "reminders",
      title: "Test Reminders",
      description: "Receive reminders about upcoming tests.",
    },
    {
      key: "leaderboard",
      title: "Leaderboard Updates",
      description: "Get updates when your leaderboard position changes.",
    },
    {
      key: "messages",
      title: "Messages",
      description: "Receive notifications for new messages.",
    },
    {
      key: "newQuizzes",
      title: "New Quizzes",
      description: "Get notified when new quizzes are available.",
    },
    {
      key: "email",
      title: "Email Notifications",
      description: "Receive important notifications through email.",
    },
  ];

  return (
    <SettingsCard
      title="Notifications"
      description="Choose what notifications you want to receive."
    >
      <div className="divide-y divide-border">
        {options.map((option) => (
          <ToggleRow
            key={option.key}
            title={option.title}
            description={option.description}
            enabled={settings[option.key]}
            onClick={() => toggle(option.key)}
          />
        ))}
      </div>
    </SettingsCard>
  );
}

/* =========================================================
   SECURITY
========================================================= */

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Password"
        description="Change your account password."
      >
        <div className="grid gap-5">
          <Input label="Current Password" type="password" icon={KeyRound} />

          <Input label="New Password" type="password" icon={KeyRound} />

          <Input label="Confirm New Password" type="password" icon={KeyRound} />

          <div className="flex justify-end">
            <button
              className="
                rounded-lg
                bg-primary
                px-5 py-2.5
                text-sm font-semibold
                text-primary-foreground
                hover:bg-primary/90
              "
            >
              Update Password
            </button>
          </div>
        </div>
      </SettingsCard>

      {/* 2FA */}

      <SettingsCard
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account."
      >
        <ToggleRow
          title="Enable 2FA"
          description="Require an additional verification code when signing in."
          enabled={false}
          onClick={() => {}}
        />
      </SettingsCard>

      {/* Sessions */}

      <SettingsCard
        title="Active Sessions"
        description="Manage devices currently signed in to your account."
      >
        <div
          className="
            flex items-center
            justify-between
            rounded-xl
            border border-border
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex size-10
                items-center justify-center
                rounded-lg
                bg-primary/10
                text-primary
              "
            >
              <Monitor size={18} />
            </div>

            <div>
              <p className="text-sm font-medium">Windows • Chrome</p>

              <p className="text-xs text-muted-foreground">Current session</p>
            </div>
          </div>

          <span
            className="
              rounded-md
              bg-success/10
              px-2 py-1
              text-[10px] font-medium
              text-success
            "
          >
            Active
          </span>
        </div>
      </SettingsCard>
    </div>
  );
}

/* =========================================================
   APPEARANCE
========================================================= */

function AppearanceSettings() {
  const [theme, setTheme] = useState("dark");

  return (
    <SettingsCard
      title="Appearance"
      description="Customize the appearance of SyllabusNova."
    >
      <div>
        <p className="text-sm font-medium">Theme</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Select how the application should appear.
        </p>
      </div>

      <div
        className="
          mt-5
          grid grid-cols-1
          gap-3
          sm:grid-cols-3
        "
      >
        <ThemeOption
          value="light"
          current={theme}
          setTheme={setTheme}
          icon={Sun}
          title="Light"
        />

        <ThemeOption
          value="dark"
          current={theme}
          setTheme={setTheme}
          icon={Moon}
          title="Dark"
        />

        <ThemeOption
          value="system"
          current={theme}
          setTheme={setTheme}
          icon={Monitor}
          title="System"
        />
      </div>

      {/* Language */}

      <div className="mt-8 border-t border-border pt-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex size-10
              items-center justify-center
              rounded-lg
              bg-muted
            "
          >
            <Globe size={18} />
          </div>

          <div>
            <p className="text-sm font-medium">Language</p>

            <p className="text-xs text-muted-foreground">
              Choose your preferred language.
            </p>
          </div>
        </div>

        <select
          className="
            mt-4
            h-11 w-full
            rounded-lg
            border border-input
            bg-background
            px-4
            text-sm
            outline-none
            focus:border-primary
          "
        >
          <option>English</option>
          <option>Urdu</option>
        </select>
      </div>
    </SettingsCard>
  );
}

/* =========================================================
   PRIVACY
========================================================= */

function PrivacySettings() {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Privacy"
        description="Control how your information is displayed."
      >
        <ToggleRow
          title="Public Profile"
          description="Allow other students to view your profile."
          enabled={true}
          onClick={() => {}}
        />

        <ToggleRow
          title="Show Test Results"
          description="Allow others to see your test performance."
          enabled={false}
          onClick={() => {}}
        />

        <ToggleRow
          title="Show Leaderboard Profile"
          description="Display your name on public leaderboards."
          enabled={true}
          onClick={() => {}}
        />
      </SettingsCard>

      {/* Danger */}

      <div
        className="
          rounded-2xl
          border border-destructive/30
          bg-destructive/5
          p-6
        "
      >
        <div className="flex items-start gap-4">
          <div
            className="
              flex size-10
              shrink-0
              items-center justify-center
              rounded-lg
              bg-destructive/10
              text-destructive
            "
          >
            <Trash2 size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-destructive">Delete Account</h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>

            <button
              className="
                mt-4
                rounded-lg
                border border-destructive/40
                px-4 py-2
                text-xs font-semibold
                text-destructive
                hover:bg-destructive/10
              "
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function SettingsCard({ title, description, children }) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-border
        bg-card
      "
    >
      <div className="border-b border-border p-6">
        <h2 className="font-semibold">{title}</h2>

        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>

      <div className="p-6">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
}) {
  return (
    <div>
      <label className="text-xs font-medium">{label}</label>

      <div className="relative mt-2">
        {Icon && (
          <Icon
            size={16}
            className="
              absolute left-3
              top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
          />
        )}

        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`
            h-11 w-full
            rounded-lg
            border border-input
            bg-background
            ${Icon ? "pl-10" : "px-4"}
            pr-4
            text-sm
            outline-none
            placeholder:text-muted-foreground
            focus:border-primary
            focus:ring-2
            focus:ring-primary/10
          `}
        />
      </div>
    </div>
  );
}

function InfoItem({ label, value, success }) {
  return (
    <div
      className="
        rounded-xl
        border border-border
        bg-background
        p-4
      "
    >
      <p className="text-[10px] text-muted-foreground">{label}</p>

      <p
        className={`
          mt-1 text-sm font-medium
          ${success ? "text-success" : "text-foreground"}
        `}
      >
        {value}
      </p>
    </div>
  );
}

function ToggleRow({ title, description, enabled, onClick }) {
  return (
    <div
      className="
        flex items-center
        justify-between
        gap-5
        border-b border-border
        py-5
        last:border-b-0
      "
    >
      <div>
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>

      <button
        onClick={onClick}
        className={`
          relative
          h-6 w-11
          shrink-0
          rounded-full
          transition
          ${enabled ? "bg-primary" : "bg-muted"}
        `}
      >
        <span
          className={`
            absolute
            top-1
            size-4
            rounded-full
            bg-white
            shadow
            transition
            ${enabled ? "left-6" : "left-1"}
          `}
        />
      </button>
    </div>
  );
}

function ThemeOption({ value, current, setTheme, icon: Icon, title }) {
  const active = current === value;

  return (
    <button
      onClick={() => setTheme(value)}
      className={`
        rounded-xl
        border
        p-4
        text-left
        transition
        ${
          active
            ? "border-primary bg-primary/10"
            : "border-border bg-background hover:border-primary/40"
        }
      `}
    >
      <div
        className={`
          flex size-10
          items-center justify-center
          rounded-lg
          ${
            active
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground"
          }
        `}
      >
        <Icon size={19} />
      </div>

      <p className="mt-3 text-sm font-medium">{title}</p>

      {active && <p className="mt-1 text-[10px] text-primary">Selected</p>}
    </button>
  );
}
