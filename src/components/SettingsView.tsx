import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserPreferences,
  DEFAULT_PREFERENCES,
  ACCENT_PALETTE,
} from '../types/settings';
import {
  IconSettingsSliders,
  IconMemoryNodes,
  IconIncidentMarker,
} from './brand/CustomIcons';
import {
  Check,
  RotateCcw,
  Download,
  AlertTriangle,
  Sparkles,
  Sliders,
  Palette,
  Shield,
  Bell,
  Cpu,
  Layers,
  CheckCircle2,
  X,
} from 'lucide-react';
import { exportPreferencesAsJson } from '../services/settings';

interface SettingsViewProps {
  preferences: UserPreferences;
  onSavePreferences: (updated: UserPreferences) => void;
  onTriggerTestToast: (title: string, desc: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  preferences,
  onSavePreferences,
  onTriggerTestToast,
}) => {
  const [form, setForm] = useState<UserPreferences>(preferences);
  const [activeTab, setActiveTab] = useState<
    'general' | 'appearance' | 'incident' | 'ai' | 'notifications' | 'privacy'
  >('general');
  const [showResetModal, setShowResetModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if external preferences change
  useEffect(() => {
    setForm(preferences);
  }, [preferences]);

  // Check if there are unsaved changes
  const hasChanges = JSON.stringify(form) !== JSON.stringify(preferences);

  const handleFieldChange = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSavePreferences(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDiscard = () => {
    setForm(preferences);
  };

  const handleResetToDefaults = () => {
    setForm(DEFAULT_PREFERENCES);
    onSavePreferences(DEFAULT_PREFERENCES);
    setShowResetModal(false);
    onTriggerTestToast('Preferences Reset', 'All user settings have been restored to factory defaults.');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Sliders },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'incident', label: 'Incidents', icon: IconIncidentMarker },
    { id: 'ai', label: 'AI Assistant', icon: Cpu },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Data', icon: Shield },
  ] as const;

  return (
    <div className="space-y-6 pb-12">
      {/* Settings Header */}
      <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#245C52] text-xs font-semibold uppercase tracking-wider mb-1">
            <IconSettingsSliders size={15} />
            <span>Workspace Configuration</span>
          </div>
          <h2 className="text-xl font-bold text-[#26332F] font-sans">
            User Preferences & System Controls
          </h2>
          <p className="text-xs text-[#78847F] mt-1">
            Tailor telemetry presentation, assistant reasoning density, visual accents, and operational thresholds
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => exportPreferencesAsJson(form)}
            className="px-3.5 py-1.5 text-xs font-medium text-[#26332F] bg-[#F7F8F5] hover:bg-[#F0F5F2] border border-[#E4E9E4] rounded-md flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#78847F]" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => setShowResetModal(true)}
            className="px-3.5 py-1.5 text-xs font-medium text-[#BF6259] bg-[#BF6259]/10 hover:bg-[#BF6259]/15 border border-[#BF6259]/20 rounded-md flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Main Settings Panel */}
      <div className="bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl shadow-xs overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-[#E4E9E4] bg-[#F7F8F5]/50 px-4 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#245C52] text-[#245C52] bg-[#FFFFFF]'
                    : 'border-transparent text-[#78847F] hover:text-[#26332F] hover:bg-[#F7F8F5]'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Areas */}
        <div className="p-6 md:p-8 space-y-6">
          {/* TAB 1: GENERAL PREFERENCES */}
          {activeTab === 'general' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-sm font-bold text-[#26332F]">Identity & Locale</h3>
                <p className="text-xs text-[#78847F] mt-0.5">
                  Configure your operator profile, workspace naming, and operational time zone.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={form.displayName}
                    onChange={(e) => handleFieldChange('displayName', e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Workspace Identifier
                  </label>
                  <input
                    type="text"
                    value={form.workspaceName}
                    onChange={(e) => handleFieldChange('workspaceName', e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Job Role / Incident Commander Designation
                  </label>
                  <input
                    type="text"
                    value={form.jobRole}
                    onChange={(e) => handleFieldChange('jobRole', e.target.value)}
                    placeholder="e.g. Staff Site Reliability Engineer"
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Preferred Language
                  </label>
                  <select
                    value={form.language}
                    onChange={(e) => handleFieldChange('language', e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF] transition-colors"
                  >
                    <option value="en">English (US)</option>
                    <option value="en-gb">English (UK)</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Time Zone
                  </label>
                  <select
                    value={form.timeZone}
                    onChange={(e) => handleFieldChange('timeZone', e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF] transition-colors"
                  >
                    <option value="UTC-7 (Pacific Time)">UTC-7 (Pacific Time)</option>
                    <option value="UTC-4 (Eastern Time)">UTC-4 (Eastern Time)</option>
                    <option value="UTC+0 (UTC / GMT)">UTC+0 (UTC / GMT)</option>
                    <option value="UTC+1 (Central European)">UTC+1 (Central European)</option>
                    <option value="UTC+5:30 (India Standard Time)">UTC+5:30 (India Standard Time)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Date & Time Format
                  </label>
                  <select
                    value={form.dateTimeFormat}
                    onChange={(e) => handleFieldChange('dateTimeFormat', e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF] transition-colors"
                  >
                    <option value="YYYY-MM-DD HH:mm:ss">ISO 8601 (2026-09-29 02:40:00)</option>
                    <option value="MMM D, YYYY h:mm A">Standard (Sep 29, 2026 2:40 AM)</option>
                    <option value="DD/MM/YYYY HH:mm">European (29/09/2026 02:40)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Default Landing Page
                  </label>
                  <select
                    value={form.defaultLandingPage}
                    onChange={(e) => handleFieldChange('defaultLandingPage', e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF] transition-colors"
                  >
                    <option value="overview">Command Overview</option>
                    <option value="active-incident">Active Incident View</option>
                    <option value="hindsight-memory">Hindsight Memory Explorer</option>
                    <option value="learning-loop">Learning Loop Visualization</option>
                  </select>
                </div>
              </div>

              {/* Interface Density */}
              <div className="pt-4 border-t border-[#E4E9E4]">
                <label className="block text-xs font-semibold text-[#26332F] mb-2">
                  Interface Density
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={() => handleFieldChange('interfaceDensity', 'comfortable')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      form.interfaceDensity === 'comfortable'
                        ? 'bg-[#F0F5F2] border-[#245C52] text-[#245C52]'
                        : 'bg-[#F7F8F5] border-[#E4E9E4] text-[#78847F]'
                    }`}
                  >
                    <span className="text-xs font-bold block">Comfortable</span>
                    <span className="text-[11px] opacity-80">Generous padding and relaxed spacing for on-call focus.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFieldChange('interfaceDensity', 'compact')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      form.interfaceDensity === 'compact'
                        ? 'bg-[#F0F5F2] border-[#245C52] text-[#245C52]'
                        : 'bg-[#F7F8F5] border-[#E4E9E4] text-[#78847F]'
                    }`}
                  >
                    <span className="text-xs font-bold block">Compact</span>
                    <span className="text-[11px] opacity-80">Higher data density for fast triage on smaller screens.</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPEARANCE & LIVE PREVIEW */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-sm font-bold text-[#26332F]">Visual Theme & Motion Engine</h3>
                <p className="text-xs text-[#78847F] mt-0.5">
                  Customize your accent color, sidebar default state, and fluid motion physics.
                </p>
              </div>

              {/* Theme Mode */}
              <div>
                <label className="block text-xs font-semibold text-[#26332F] mb-2">
                  Color Mode
                </label>
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  {(['light', 'dark', 'system'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleFieldChange('theme', t)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold capitalize text-center transition-all ${
                        form.theme === t
                          ? 'bg-[#F0F5F2] border-[#245C52] text-[#245C52]'
                          : 'bg-[#F7F8F5] border-[#E4E9E4] text-[#78847F]'
                      }`}
                    >
                      {t} Mode
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color Palette */}
              <div>
                <label className="block text-xs font-semibold text-[#26332F] mb-2">
                  Primary Accent Color
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {ACCENT_PALETTE.map((pal) => {
                    const isSelected = form.accentColor === pal.value;
                    return (
                      <button
                        key={pal.value}
                        type="button"
                        onClick={() => handleFieldChange('accentColor', pal.value)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#FFFFFF] border-[#26332F] shadow-xs'
                            : 'bg-[#F7F8F5] border-[#E4E9E4] hover:bg-[#FFFFFF]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{ backgroundColor: pal.value }}
                        />
                        <span>{pal.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#26332F]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Motion & Physics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E4E9E4]">
                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Animation Intensity
                  </label>
                  <select
                    value={form.animationIntensity}
                    onChange={(e) => handleFieldChange('animationIntensity', e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                  >
                    <option value="subtle">Subtle (Smooth, understated transitions)</option>
                    <option value="balanced">Balanced (Recommended for live operations)</option>
                    <option value="minimal">Minimal (Near-instant settling curves)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Sidebar Default State
                  </label>
                  <select
                    value={form.sidebarDefault}
                    onChange={(e) => handleFieldChange('sidebarDefault', e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                  >
                    <option value="expanded">Expanded (Full navigation with labels)</option>
                    <option value="collapsed">Collapsed (Icon-only compact sidebar)</option>
                  </select>
                </div>

                <div className="sm:col-span-2 flex items-center justify-between p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">Reduced-Motion Mode</span>
                    <span className="text-[11px] text-[#78847F]">Disables non-essential motion transitions in compliance with accessibility preferences.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.reducedMotion}
                    onChange={(e) => handleFieldChange('reducedMotion', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="pt-4 border-t border-[#E4E9E4]">
                <span className="text-xs font-semibold text-[#78847F] uppercase tracking-wider block mb-2">
                  Live Appearance Preview
                </span>
                <div
                  className="p-5 rounded-xl border transition-all"
                  style={{
                    backgroundColor: form.theme === 'dark' ? '#18201E' : '#FFFFFF',
                    borderColor: '#E4E9E4',
                    color: form.theme === 'dark' ? '#F7F8F5' : '#26332F',
                  }}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#E4E9E4]/60">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: form.accentColor }}
                      />
                      <span className="text-xs font-bold font-mono">INC-042 [PREVIEW]</span>
                    </div>
                    <span
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${form.accentColor}20`,
                        color: form.accentColor,
                      }}
                    >
                      {form.theme.toUpperCase()} MODE
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-xs">
                    <span>Accent Primary: <code className="font-mono font-bold">{form.accentColor}</code></span>
                    <button
                      type="button"
                      className="px-3 py-1 rounded text-white text-xs font-semibold shadow-xs"
                      style={{ backgroundColor: form.accentColor }}
                    >
                      Sample Action
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INCIDENT PREFERENCES */}
          {activeTab === 'incident' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-sm font-bold text-[#26332F]">Incident Telemetry & Diagnostic Rules</h3>
                <p className="text-xs text-[#78847F] mt-0.5">
                  Configure filtering thresholds, telemetry refresh polling, and evidence rendering.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Default Severity Filter
                  </label>
                  <select
                    value={form.severityFilter}
                    onChange={(e) => handleFieldChange('severityFilter', e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                  >
                    <option value="all">All Severities (P1 - P4)</option>
                    <option value="critical">Critical Only (CRITICAL)</option>
                    <option value="high-critical">High & Critical (HIGH / CRITICAL)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Telemetry Refresh Interval
                  </label>
                  <select
                    value={form.refreshIntervalSeconds}
                    onChange={(e) => handleFieldChange('refreshIntervalSeconds', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                  >
                    <option value={15}>15 Seconds (Real-time)</option>
                    <option value={30}>30 Seconds (Standard)</option>
                    <option value={60}>60 Seconds (Conservation)</option>
                    <option value={0}>Manual Refresh Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Incident Display Layout
                  </label>
                  <select
                    value={form.incidentLayout}
                    onChange={(e) => handleFieldChange('incidentLayout', e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                  >
                    <option value="expanded">Expanded Editorial Layout</option>
                    <option value="compact">Compact Telemetry Rows</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Default Sorting Order
                  </label>
                  <select
                    value={form.incidentSorting}
                    onChange={(e) => handleFieldChange('incidentSorting', e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                  >
                    <option value="severity">Highest Severity First</option>
                    <option value="detected">Most Recently Detected</option>
                    <option value="impact">Highest Traffic Impact</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-3 border-t border-[#E4E9E4]">
                <div className="flex items-center justify-between p-3 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">Display Historical Evidence</span>
                    <span className="text-[11px] text-[#78847F]">Show matching past incident cards and resolutions in diagnosis results.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.displayHistoricalEvidence}
                    onChange={(e) => handleFieldChange('displayHistoricalEvidence', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">Show Confidence Indicators</span>
                    <span className="text-[11px] text-[#78847F]">Render statistical pattern match percentages and certainty meters.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.showConfidenceIndicators}
                    onChange={(e) => handleFieldChange('showConfidenceIndicators', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">Auto-Analyze on High Anomaly</span>
                    <span className="text-[11px] text-[#78847F]">Immediately initiate diagnostic reasoning sequence when error rate exceeds threshold.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.autoAnalyzeOnDetection}
                    onChange={(e) => handleFieldChange('autoAnalyzeOnDetection', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Analysis Context */}
              <div>
                <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                  Default Operational Scope & Analysis Context
                </label>
                <textarea
                  rows={2}
                  value={form.defaultAnalysisContext}
                  onChange={(e) => handleFieldChange('defaultAnalysisContext', e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF]"
                />
              </div>
            </div>
          )}

          {/* TAB 4: AI ASSISTANT PREFERENCES */}
          {activeTab === 'ai' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-sm font-bold text-[#26332F]">Groq Reasoning Engine & Assistant Prompting</h3>
                <p className="text-xs text-[#78847F] mt-0.5">
                  Configure explanation style, runbook generation formats, and custom engineer instructions.
                </p>
              </div>

              {/* Notice Banner */}
              <div className="p-3.5 rounded-lg bg-[#F0F5F2] border border-[#91B4A5]/40 text-xs text-[#245C52] space-y-1">
                <span className="font-semibold block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Presentation vs. Diagnostic Integrity
                </span>
                <p className="text-[11px] text-[#485350] leading-relaxed">
                  These settings control how the assistant formulates runbook prose and reasoning summaries. The underlying root cause calculation is grounded strictly in telemetry and verified Hindsight memory graphs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Preferred Explanation Style
                  </label>
                  <select
                    value={form.explanationStyle}
                    onChange={(e) => handleFieldChange('explanationStyle', e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                  >
                    <option value="concise">Concise (Action-oriented bullets)</option>
                    <option value="balanced">Balanced (Context + direct mitigation)</option>
                    <option value="detailed">Detailed (Deep telemetry correlation analysis)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                    Recommendation Format
                  </label>
                  <select
                    value={form.recommendationFormat}
                    onChange={(e) => handleFieldChange('recommendationFormat', e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                  >
                    <option value="runbook">Operational Runbook Format</option>
                    <option value="executive">Executive Summary</option>
                    <option value="technical">Technical Advisory Bulletin</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">Show Reasoning Summaries</span>
                    <span className="text-[11px] text-[#78847F]">Include Groq Llama 3 deduction paragraphs in the diagnosis view.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.showReasoningSummaries}
                    onChange={(e) => handleFieldChange('showReasoningSummaries', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">Display Related Historical Incidents</span>
                    <span className="text-[11px] text-[#78847F]">Surface historical evidence cards recalled by Hindsight vector graphs.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.displayRelatedIncidents}
                    onChange={(e) => handleFieldChange('displayRelatedIncidents', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                  Custom Instructions for Incident Reasoning
                </label>
                <textarea
                  rows={3}
                  value={form.customInstructions}
                  onChange={(e) => handleFieldChange('customInstructions', e.target.value)}
                  placeholder="e.g. Prioritize MTTR reduction and connection pool saturation diagnostics."
                  className="w-full px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52] focus:bg-[#FFFFFF]"
                />
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#26332F]">In-App Alerts & Hindsight Signals</h3>
                  <p className="text-xs text-[#78847F] mt-0.5">
                    Configure real-time notifications for analysis completion and memory retention.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onTriggerTestToast('Test Notification Preview', 'In-app notification system is verified and active.')}
                  className="px-3 py-1.5 text-xs font-medium text-[#245C52] bg-[#F0F5F2] hover:bg-[#E5ECE8] border border-[#91B4A5]/40 rounded-md transition-colors"
                >
                  Send Preview Toast
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">In-App Banner Notifications</span>
                    <span className="text-[11px] text-[#78847F]">Display fluid toast banners for important system events.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.inAppNotifications}
                    onChange={(e) => handleFieldChange('inAppNotifications', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">Incident Resolution Confirmations</span>
                    <span className="text-[11px] text-[#78847F]">Notify when an on-call resolution is recorded and marked complete.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.incidentResolutionNotifications}
                    onChange={(e) => handleFieldChange('incidentResolutionNotifications', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">Hindsight Memory Learning Confirmations</span>
                    <span className="text-[11px] text-[#78847F]">Alert when the backend confirms experience node storage in organizational memory.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.memoryLearningConfirmations}
                    onChange={(e) => handleFieldChange('memoryLearningConfirmations', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#F7F8F5] border border-[#E4E9E4] rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-[#26332F] block">System Status & Service Alerts</span>
                    <span className="text-[11px] text-[#78847F]">Notify upon backend connectivity degradation or endpoint failovers.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.systemStatusAlerts}
                    onChange={(e) => handleFieldChange('systemStatusAlerts', e.target.checked)}
                    className="w-4 h-4 accent-[#245C52] rounded cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                  Notification Delivery Cadence
                </label>
                <select
                  value={form.notificationFrequency}
                  onChange={(e) => handleFieldChange('notificationFrequency', e.target.value as any)}
                  className="w-full sm:w-72 px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                >
                  <option value="immediate">Immediate Real-time Stream</option>
                  <option value="batched">Batched Digest (Summarized)</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 6: PRIVACY & DATA */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-sm font-bold text-[#26332F]">Data Governance & Hindsight Security</h3>
                <p className="text-xs text-[#78847F] mt-0.5">
                  Review telemetry handling and persistent institutional memory boundaries.
                </p>
              </div>

              {/* Explanation of what is stored */}
              <div className="p-4 rounded-xl bg-[#F7F8F5] border border-[#E4E9E4] space-y-3">
                <span className="text-xs font-bold text-[#26332F] block flex items-center gap-1.5">
                  <IconMemoryNodes size={15} className="text-[#245C52]" />
                  What is stored in Hindsight Memory?
                </span>
                <p className="text-xs text-[#485350] leading-relaxed">
                  Hindsight indexes anonymized incident failure signatures (e.g. saturation percentage, query wait queue depth, error gradient), confirmed remediation actions, verified resolution times (MTTR), and engineer feedback.
                </p>
                <div className="pt-2 border-t border-[#E4E9E4] flex flex-wrap gap-4 text-[11px] text-[#78847F] font-mono">
                  <span>✓ No Customer PII</span>
                  <span>✓ No Secrets or Tokens</span>
                  <span>✓ Immutable Audit Log</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#26332F] mb-1.5">
                  Memory Graph Retention Scope
                </label>
                <select
                  value={form.memoryRetention}
                  onChange={(e) => handleFieldChange('memoryRetention', e.target.value as any)}
                  className="w-full sm:w-80 px-3 py-2 bg-[#F7F8F5] border border-[#E4E9E4] rounded-md text-xs text-[#26332F] focus:outline-hidden focus:border-[#245C52]"
                >
                  <option value="persistent">Persistent (Permanent organizational memory)</option>
                  <option value="session">Session-Scoped (Clear upon workspace reset)</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EC] border border-[#C8A66A]/40 text-xs text-[#26332F] space-y-2">
                <span className="font-semibold block flex items-center gap-1.5 text-[#C8A66A]">
                  <Shield className="w-4 h-4" />
                  Credentials & Zero-Trust Isolation
                </span>
                <p className="text-[11px] text-[#485350] leading-relaxed">
                  ResolveIQ operates with zero hardcoded client secrets. Backend proxies manage all upstream Groq AI and database connections securely.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Persistent Action Bar */}
        <div className="px-6 py-4 bg-[#F7F8F5] border-t border-[#E4E9E4] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            {hasChanges ? (
              <span className="flex items-center gap-1.5 text-[#C8A66A] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#C8A66A] animate-pulse" />
                You have unsaved changes
              </span>
            ) : saveSuccess ? (
              <span className="flex items-center gap-1.5 text-[#43866A] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Preferences saved successfully
              </span>
            ) : (
              <span className="text-[#78847F]">All preferences are up to date</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {hasChanges && (
              <button
                type="button"
                onClick={handleDiscard}
                className="px-3.5 py-1.5 text-xs font-medium text-[#78847F] hover:text-[#26332F] transition-colors"
              >
                Discard
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges}
              className={`px-5 py-2 rounded-md text-xs font-semibold transition-all shadow-xs ${
                hasChanges
                  ? 'bg-[#245C52] hover:bg-[#1D4B43] text-white cursor-pointer active:scale-98'
                  : 'bg-[#E4E9E4] text-[#78847F] opacity-60 cursor-not-allowed'
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Reset Defaults */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-2xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#FFFFFF] border border-[#E4E9E4] rounded-xl shadow-xl p-6 space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#BF6259]/10 text-[#BF6259] shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#26332F]">Reset All Preferences?</h3>
                  <p className="text-xs text-[#78847F] mt-1 leading-relaxed">
                    This will restore all workspace settings, theme choices, density preferences, and notification rules to factory defaults.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E4E9E4]">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="px-3.5 py-1.5 text-xs font-medium text-[#78847F] hover:text-[#26332F]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#BF6259] hover:bg-[#A9534B] rounded-md transition-colors"
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
