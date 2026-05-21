import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors, fontDisplay, fontMono, halftoneStyle } from "./theme";

/* ================================================================
   CONSTANTS
   ================================================================ */

const TOTAL_SLIDES = 17;
const SLIDE_DURATION = 150;
const TRANSITION_DURATION = 15;

export function getDurationInFrames() {
  return TOTAL_SLIDES * SLIDE_DURATION - (TOTAL_SLIDES - 1) * TRANSITION_DURATION;
}

/* ================================================================
   UTILITY HOOKS
   ================================================================ */

const useReveal = (delayFrames = 0) => {
  const frame = useCurrentFrame();
  return interpolate(frame - delayFrames, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
};

/* ================================================================
   SHARED COMPONENTS
   ================================================================ */

const Halftone: React.FC = () => <div style={halftoneStyle} />;

const SectionNum: React.FC<{ num: string }> = ({ num }) => {
  const reveal = useReveal(0);
  return (
    <div
      style={{
        fontFamily: fontDisplay,
        fontSize: 160,
        fontWeight: 800,
        lineHeight: 1,
        color: `rgba(0,102,255,${reveal * 0.15})`,
        position: "absolute",
        top: 60,
        right: 80,
        userSelect: "none",
      }}
    >
      {num}
    </div>
  );
};

const AccentBar: React.FC<{ delay?: number }> = ({ delay = 10 }) => {
  const reveal = useReveal(delay);
  return (
    <div
      style={{
        width: 80,
        height: 4,
        background: colors.neon,
        marginBottom: 36,
        transform: `scaleX(${reveal})`,
        transformOrigin: "left center",
      }}
    />
  );
};

const SlideTitle: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 5 }) => {
  const reveal = useReveal(delay);
  return (
    <h2
      style={{
        fontFamily: fontDisplay,
        fontWeight: 700,
        fontSize: 52,
        color: colors.text,
        marginBottom: 12,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 30}px)`,
      }}
    >
      {children}
    </h2>
  );
};

const SlideFrame: React.FC<{
  sectionNum?: string;
  title: string;
  children: React.ReactNode;
}> = ({ sectionNum, title, children }) => (
  <AbsoluteFill
    style={{
      background: `
        radial-gradient(ellipse at 30% 70%, rgba(0,102,255,0.2) 0%, transparent 60%),
        ${colors.bg}
      `,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "80px 120px",
    }}
  >
    <Halftone />
    {sectionNum && <SectionNum num={sectionNum} />}
    <SlideTitle>{title}</SlideTitle>
    <AccentBar />
    {children}
  </AbsoluteFill>
);

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

const NeonBadge: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const reveal = useReveal(delay);
  return (
    <span
      style={{
        display: "inline-block",
        background: colors.neon,
        color: colors.bg,
        fontFamily: fontDisplay,
        fontWeight: 800,
        fontSize: 16,
        padding: "6px 20px",
        borderRadius: 4,
        letterSpacing: "0.05em",
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 20}px)`,
      }}
    >
      {children}
    </span>
  );
};

const Card: React.FC<{
  title?: string;
  titleColor?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
}> = ({ title, titleColor = colors.cyan, children, style, delay = 0 }) => {
  const reveal = useReveal(delay);
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: 8,
        padding: "24px 28px",
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 25}px)`,
        ...style,
      }}
    >
      {title && (
        <h3
          style={{
            fontFamily: fontDisplay,
            fontSize: 26,
            color: titleColor,
            marginBottom: 8,
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

const CodeBlock: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const reveal = useReveal(delay);
  return (
    <div
      style={{
        background: colors.dark,
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 6,
        padding: "18px 24px",
        fontFamily: fontMono,
        fontSize: 17,
        color: colors.cyan,
        lineHeight: 1.6,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 20}px)`,
      }}
    >
      {children}
    </div>
  );
};

const StepNum: React.FC<{ n: number }> = ({ n }) => (
  <div
    style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: colors.blue,
      color: colors.text,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: fontDisplay,
      fontWeight: 800,
      fontSize: 16,
      flexShrink: 0,
    }}
  >
    {n}
  </div>
);

const FlowArrow: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const reveal = useReveal(delay);
  return (
    <div
      style={{
        textAlign: "center",
        color: colors.neon,
        fontSize: 32,
        padding: "4px 0",
        opacity: reveal,
      }}
    >
      ▼
    </div>
  );
};

const PipelineStep: React.FC<{
  n: number;
  children: React.ReactNode;
  delay: number;
  color?: string;
}> = ({ n, children, delay, color }) => {
  const reveal = useReveal(delay);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "10px 22px",
        background: "rgba(255,255,255,0.02)",
        borderRadius: 6,
        borderLeft: `3px solid ${color || "transparent"}`,
        opacity: reveal,
        transform: `translateX(${(1 - reveal) * 20}px)`,
      }}
    >
      <StepNum n={n} />
      <span style={{ color: colors.muted, fontSize: 20 }}>{children}</span>
    </div>
  );
};

const FlowBox: React.FC<{
  title: string;
  subtitle: string;
  titleColor?: string;
  borderColor?: string;
  bgColor?: string;
  delay?: number;
}> = ({ title, subtitle, titleColor = colors.cyan, borderColor, bgColor, delay = 0 }) => {
  const reveal = useReveal(delay);
  return (
    <div
      style={{
        background: bgColor || "rgba(255,255,255,0.04)",
        border: `1px solid ${borderColor || "rgba(255,255,255,0.08)"}`,
        borderRadius: 8,
        padding: "20px 32px",
        textAlign: "center",
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 20}px)`,
      }}
    >
      <p style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 30, color: titleColor }}>
        {title}
      </p>
      {subtitle ? (
        <p style={{ color: colors.muted, fontSize: 16, marginTop: 4 }}>{subtitle}</p>
      ) : null}
    </div>
  );
};

/* ================================================================
   P1 — TITLE SLIDE
   ================================================================ */

const P1Title: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `
        radial-gradient(ellipse at 30% 70%, rgba(0,102,255,0.3) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(212,255,0,0.08) 0%, transparent 50%),
        ${colors.bg}
      `,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 80,
    }}
  >
    <div style={{ ...halftoneStyle, opacity: 0.06 }} />
    <NeonBadge delay={5}>TECH TALK</NeonBadge>
    <h1
      style={{
        fontFamily: fontDisplay,
        fontWeight: 800,
        fontSize: 96,
        color: colors.text,
        marginTop: 40,
        letterSpacing: "-0.02em",
        opacity: useReveal(15),
        transform: `translateY(${(1 - useReveal(15)) * 30}px)`,
      }}
    >
      日志采集平台
    </h1>
    <p
      style={{
        fontSize: 36,
        color: colors.muted,
        fontFamily: fontMono,
        marginTop: 12,
        opacity: useReveal(25),
        transform: `translateY(${(1 - useReveal(25)) * 20}px)`,
      }}
    >
      架构设计与技术实践
    </p>
    <p
      style={{
        fontSize: 24,
        color: colors.cyan,
        marginTop: 28,
        fontFamily: fontDisplay,
        fontWeight: 600,
        opacity: useReveal(35),
      }}
    >
      多源采集 · 规则驱动 · 插件化扩展
    </p>
    <div
      style={{
        display: "flex",
        gap: 60,
        marginTop: 56,
        justifyContent: "center",
        alignItems: "center",
        opacity: useReveal(45),
        transform: `translateY(${(1 - useReveal(45)) * 20}px)`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Img
          src={staticFile("bm.png")}
          style={{
            width: 140,
            height: 140,
            borderRadius: 8,
            border: "2px solid rgba(255,255,255,0.12)",
            background: "#fff",
            padding: 6,
          }}
        />
        <span style={{ fontFamily: fontMono, fontSize: 16, color: colors.muted }}>扫码报名</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Img
          src={staticFile("qd.png")}
          style={{
            width: 140,
            height: 140,
            borderRadius: 8,
            border: "2px solid rgba(255,255,255,0.12)",
            background: "#fff",
            padding: 6,
          }}
        />
        <span style={{ fontFamily: fontMono, fontSize: 16, color: colors.muted }}>扫码签到</span>
      </div>
    </div>
  </AbsoluteFill>
);

/* ================================================================
   P2 — PROBLEM CARDS
   ================================================================ */

const P2Problem: React.FC = () => (
  <SlideFrame sectionNum="02" title="平台定位与解决的问题">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 1100 }}>
      {[
        { title: "异构日志源统一接入", desc: "Kafka、Syslog 等多种日志源，需要一个统一的接入层" },
        { title: "日志格式千差万别", desc: "不同系统的日志格式各异，需要规则驱动的可配置解析" },
        { title: "业务场景差异大", desc: "DDoS防护、安全审计等不同场景需要不同处理逻辑，插件化扩展是刚需" },
        { title: "运维需要可视化管理", desc: "规则配置、实例监控、在线测试需要统一管理界面" },
      ].map((c, i) => {
        const reveal = useReveal(20 + i * 9);
        return (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.03)",
              borderLeft: `3px solid ${colors.blue}`,
              padding: "22px 26px",
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 25}px)`,
            }}
          >
            <h3 style={{ fontFamily: fontDisplay, color: colors.cyan, fontSize: 24 }}>{c.title}</h3>
            <p style={{ color: colors.muted, marginTop: 6, fontSize: 18 }}>{c.desc}</p>
          </div>
        );
      })}
    </div>
  </SlideFrame>
);

/* ================================================================
   P3 — THREE MODULES
   ================================================================ */

const P3Modules: React.FC = () => (
  <SlideFrame sectionNum="03" title="三模块关系全景">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        maxWidth: 700,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <FlowBox title="gather-manage" subtitle="管理界面（Vue3 + Element Plus）" delay={20} />
      <FlowArrow delay={25} />
      <FlowBox
        title="gather-adapter"
        subtitle="核心引擎（采集 → 解析 → 富化 → 输出）"
        titleColor={colors.neon}
        borderColor={colors.neon}
        bgColor="rgba(212,255,0,0.05)"
        delay={30}
      />
      <FlowArrow delay={35} />
      <FlowBox
        title="gather-adapter-ddos"
        subtitle="DDoS 防护日志采集实例"
        titleColor={colors.magenta}
        delay={40}
      />
    </div>
  </SlideFrame>
);

/* ================================================================
   P4 — ARCHITECTURE FLOW
   ================================================================ */

const P4Arch: React.FC = () => (
  <SlideFrame sectionNum="04" title="整体技术架构 — 数据流三层">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxWidth: 1000,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "rgba(0,102,255,0.2)",
          border: "1px solid rgba(0,102,255,0.35)",
          borderRadius: 8,
          padding: "22px 36px",
          textAlign: "center",
          fontFamily: fontDisplay,
          fontWeight: 700,
          fontSize: 22,
          opacity: useReveal(20),
          transform: `translateY(${(1 - useReveal(20)) * 20}px)`,
        }}
      >
        <div style={{ fontSize: 15, color: colors.muted, marginBottom: 6 }}>采集层</div>
        <div style={{ fontSize: 20 }}>Kafka Consumer &nbsp;·&nbsp; Syslog Server (Netty UDP)</div>
      </div>
      <FlowArrow delay={25} />
      <div
        style={{
          background: "rgba(0,255,204,0.08)",
          border: "1px solid rgba(0,255,204,0.25)",
          borderRadius: 8,
          padding: "22px 36px",
          textAlign: "center",
          fontFamily: fontDisplay,
          fontWeight: 700,
          fontSize: 22,
          opacity: useReveal(30),
          transform: `translateY(${(1 - useReveal(30)) * 20}px)`,
        }}
      >
        <div style={{ fontSize: 15, color: colors.muted, marginBottom: 6 }}>处理层</div>
        <div style={{ fontSize: 17 }}>
          规则匹配 → 字段提取 → 脚本加工 → 资产富化 → 丢弃过滤 → 自定义处理
        </div>
        <div style={{ fontSize: 15, color: colors.cyan, marginTop: 6 }}>
          核心类: DefaultCommonDeal / AbstractCustomDeal / ResourceRich
        </div>
      </div>
      <FlowArrow delay={35} />
      <div
        style={{
          background: "rgba(212,255,0,0.08)",
          border: "1px solid rgba(212,255,0,0.25)",
          borderRadius: 8,
          padding: "22px 36px",
          textAlign: "center",
          fontFamily: fontDisplay,
          fontWeight: 700,
          fontSize: 22,
          opacity: useReveal(40),
          transform: `translateY(${(1 - useReveal(40)) * 20}px)`,
        }}
      >
        <div style={{ fontSize: 15, color: colors.muted, marginBottom: 6 }}>输出层</div>
        <div style={{ fontSize: 20 }}>目标 Kafka Producer / 通知 / 持久化</div>
      </div>
    </div>
  </SlideFrame>
);

/* ================================================================
   P5 — DUAL SOURCE
   ================================================================ */

const P5DualSource: React.FC = () => (
  <SlideFrame sectionNum="05" title="采集层：双源接入">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1100, marginBottom: 24 }}>
      <Card title="KafkaServer" delay={20}>
        <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 18, lineHeight: 2.3 }}>
          <li>MessageHandler 多线程并发消费</li>
          <li>Consumer/Producer 动态初始化</li>
          <li>热更新: ruleBoxSet() 触发规则重载</li>
        </ul>
      </Card>
      <Card title="SyslogServer" delay={30}>
        <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 18, lineHeight: 2.3 }}>
          <li>Netty UDP NioDatagramChannel</li>
          <li>CompletableFuture 异步启动</li>
          <li>ChannelOption 可配</li>
        </ul>
      </Card>
    </div>
    <div style={{ maxWidth: 1100 }}>
      <p
        style={{
          color: colors.cyan,
          fontFamily: fontDisplay,
          fontSize: 22,
          marginBottom: 8,
          opacity: useReveal(40),
        }}
      >
        统一接口 + 工厂模式
      </p>
      <CodeBlock delay={45}>
        <span style={{ color: colors.magenta }}>public interface</span> LogServer {"{"}<br />
        {"  "}start(); stop(); isStart(); isStop();<br />
        {"  "}ruleBoxSet(RuleBox rb); monitor();<br />
        {"}"}<br />
        <br />
        <span style={{ color: "rgba(255,255,255,0.5)" }}>// ServerFactory.create() 根据 collectSourceWay 创建</span><br />
        <span style={{ color: colors.magenta }}>if</span> (<span style={{ color: colors.neon }}>"syslog"</span>) → SyslogServer<br />
        <span style={{ color: colors.magenta }}>if</span> (<span style={{ color: colors.neon }}>"kafka"</span>) → KafkaServer
      </CodeBlock>
    </div>
  </SlideFrame>
);

/* ================================================================
   P6 — PIPELINE
   ================================================================ */

const P6Pipeline: React.FC = () => (
  <SlideFrame sectionNum="06" title="处理层：一条日志的完整旅程">
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 1100 }}>
      {[
        <span><b>正则字段提取</b> — LogField.regex → Pattern → Matcher，多字段捕获组拼接</span>,
        <span><b>脚本二次加工</b> — ScriptService.execute()，支持 Python / JavaScript</span>,
        <span><b>模板填充</b> — StrUtils.replacePlaceHolders() 将字段值填入 formatTemplate</span>,
        <span><b>资产富化</b> — ResourceRich.rich()，如 IP 反查归属信息</span>,
        <span><b>丢弃过滤</b> — ChainRule 规则引擎 + 时间段窗口</span>,
        <span><b>自定义处理</b> — CustomDealFacade.consume() 路由到扩展实现</span>,
        <span><b>输出 Kafka</b> — KafkaTemplate.send() 发送到目标 Topic</span>,
      ].map((label, i) => (
        <PipelineStep key={i} n={i + 1} delay={20 + i * 7} color={i === 6 ? colors.neonBorder : undefined}>
          {label}
        </PipelineStep>
      ))}
    </div>
    <p
      style={{
        color: colors.cyan,
        fontSize: 16,
        marginTop: 12,
        fontFamily: fontMono,
        opacity: useReveal(75),
      }}
    >
      入口: DefaultCommonDeal.deal(msg, matchLogRule, ruleBox, kafkaTemplate)
    </p>
  </SlideFrame>
);

/* ================================================================
   P7 — THREE RULE LAYERS
   ================================================================ */

const P7Rules: React.FC = () => (
  <SlideFrame sectionNum="07" title="规则引擎：三层规则模型">
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20,
        maxWidth: 1200,
      }}
    >
      {[
        {
          title: "ServerRuleEntity",
          titleColor: colors.cyan,
          desc: "采集服务实例规则",
          bg: colors.blueBg,
          border: colors.blueBorder,
          items: ["采集源类型 & 端口", "匹配策略 (matchWay/regex/script)", "丢弃策略 & 调试开关"],
        },
        {
          title: "LogRuleEntity",
          titleColor: colors.neon,
          desc: "日志解析规则",
          bg: colors.cyanBg,
          border: colors.cyanBorder,
          items: ["正则模板 & 格式模板", "富化开关 (richWay)", "关联字段列表"],
        },
        {
          title: "KafkaRuleEntity",
          titleColor: colors.magenta,
          desc: "Kafka 连接规则",
          bg: colors.neonBg,
          border: colors.neonBorder,
          items: ["源 Kafka 消费配置", "目标 Kafka 生产配置", "并发/序列化等参数"],
        },
      ].map((col, i) => {
        const reveal = useReveal(20 + i * 10);
        return (
          <div
            key={i}
            style={{
              background: col.bg,
              border: `1px solid ${col.border}`,
              borderRadius: 8,
              padding: "28px 24px",
              textAlign: "center",
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 25}px)`,
            }}
          >
            <h3 style={{ fontFamily: fontDisplay, fontSize: 26, color: col.titleColor, marginBottom: 8 }}>
              {col.title}
            </h3>
            <p style={{ color: colors.muted, fontSize: 15, marginBottom: 12 }}>{col.desc}</p>
            <ul style={{ color: colors.muted, paddingLeft: 20, textAlign: "left", fontSize: 16, lineHeight: 2 }}>
              {col.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
    <p
      style={{
        color: colors.cyan,
        fontSize: 16,
        marginTop: 20,
        fontFamily: fontMono,
        textAlign: "center",
        opacity: useReveal(55),
      }}
    >
      RuleBox 聚合三层规则 → ruleBoxSet() 热更新 → 无需重启
    </p>
  </SlideFrame>
);

/* ================================================================
   P8 — LOG FIELD
   ================================================================ */

const P8LogField: React.FC = () => (
  <SlideFrame sectionNum="08" title="日志解析规则详解：LogField">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 1100 }}>
      <div>
        <p style={{ fontFamily: fontDisplay, color: colors.cyan, fontSize: 24, marginBottom: 10 }}>字段模型</p>
        <CodeBlock delay={20}>
          LogField {"{"}<br />
          {"  "}<span style={{ color: colors.neon }}>name</span>: <span style={{ color: colors.neon }}>"src_ip"</span>,<br />
          {"  "}<span style={{ color: colors.neon }}>regex</span>: <span style={{ color: colors.neon }}>"SRC=([0-9.]+)"</span>,<br />
          {"  "}<span style={{ color: colors.neon }}>scriptType</span>: <span style={{ color: colors.neon }}>"python"</span>,<br />
          {"  "}<span style={{ color: colors.neon }}>scriptContent</span>: <span style={{ color: colors.neon }}>"..."</span><br />
          {"}"}
        </CodeBlock>
      </div>
      <div>
        <p style={{ fontFamily: fontDisplay, color: colors.neon, fontSize: 24, marginBottom: 10 }}>处理流程</p>
        <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 20, lineHeight: 2.4 }}>
          {[
            "正则匹配 → 捕获组拼接",
            "可选脚本二次加工",
            "结果 → formatTemplate 占位符替换",
            "管理界面在线脚本测试",
          ].map((item, i) => {
            const reveal = useReveal(30 + i * 8);
            return (
              <li key={i} style={{ opacity: reveal, transform: `translateX(${(1 - reveal) * 15}px)` }}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </SlideFrame>
);

/* ================================================================
   P9 — RESOURCE RICH & FILTER
   ================================================================ */

const P9Rich: React.FC = () => (
  <SlideFrame sectionNum="09" title="资产富化 & 丢弃过滤">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1100 }}>
      <Card title="ResourceRich 接口" delay={20}>
        <CodeBlock delay={25}>
          <span style={{ color: colors.magenta }}>interface</span> ResourceRich {"{"}<br />
          {"  "}rich(RuleBox, MatchLogRule, Map)→ String<br />
          {"}"}
        </CodeBlock>
        <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 18, lineHeight: 2, marginTop: 12 }}>
          <li>典型实现: ResourceRichByIp (IP反查)</li>
          <li>OptionalFacade 模式支持多实现</li>
        </ul>
      </Card>
      <Card title="丢弃过滤" delay={35}>
        <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 18, lineHeight: 2.4 }}>
          <li>ChainRule 规则引擎匹配</li>
          <li>discardTimeArray 时间段窗口</li>
          <li>调试模式可观察丢弃详情</li>
        </ul>
      </Card>
    </div>
  </SlideFrame>
);

/* ================================================================
   P10 — EXTENSION MECHANISM
   ================================================================ */

const P10Extend: React.FC = () => (
  <SlideFrame sectionNum="10" title="插件化扩展：CustomDeal 机制">
    <div
      style={{
        background: "rgba(0,102,255,0.08)",
        border: "1px solid rgba(0,102,255,0.25)",
        borderRadius: 8,
        padding: "24px 32px",
        maxWidth: 1100,
        marginBottom: 24,
      }}
    >
      <p style={{ fontFamily: fontDisplay, color: colors.cyan, fontSize: 24, marginBottom: 16, opacity: useReveal(20) }}>
        AbstractCustomDeal&lt;T&gt; 基类能力
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 18, lineHeight: 2.2 }}>
          <li style={{ opacity: useReveal(30) }}>内置内存队列（有界/无界可配）</li>
          <li style={{ opacity: useReveal(38) }}>单线程 / 多线程消费模式</li>
        </ul>
        <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 18, lineHeight: 2.2 }}>
          <li style={{ opacity: useReveal(30) }}>优雅关闭：drain 队列残留消息</li>
          <li style={{ opacity: useReveal(38) }}>CustomDealFacade 按 getKey() 路由</li>
        </ul>
      </div>
    </div>
    <div style={{ maxWidth: 1100 }}>
      <p style={{ fontFamily: fontDisplay, color: colors.neon, fontSize: 22, marginBottom: 8, opacity: useReveal(50) }}>
        扩展只需两步
      </p>
      <CodeBlock delay={55}>
        <span style={{ color: "rgba(255,255,255,0.5)" }}>// 1. 继承抽象基类，指定消息类型</span><br />
        <span style={{ color: colors.magenta }}>class</span> TrafficCleanDeal <span style={{ color: colors.magenta }}>extends</span> AbstractCustomDeal&lt;TrafficCleanModel&gt; {"{"}<br />
        {"  "}<span style={{ color: "rgba(255,255,255,0.5)" }}>// 2. 实现 consumeAsync + getKey + getType</span><br />
        {"  "}@Override consumeAsync(TrafficCleanModel msg) {"{ "}<span style={{ color: "rgba(255,255,255,0.5)" }}>{"/* 业务逻辑 */"}</span>{" }"}<br />
        {"  "}@Override getKey() {"{ "}<span style={{ color: colors.magenta }}>return</span> <span style={{ color: colors.neon }}>"log-189"</span>;{" }"}<br />
        {"}"}
      </CodeBlock>
    </div>
  </SlideFrame>
);

/* ================================================================
   P11 — DDOS OVERVIEW
   ================================================================ */

const P11DdosOverview: React.FC = () => (
  <SlideFrame sectionNum="11" title="DDoS 防护实例：扩展全景">
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, maxWidth: 750, alignSelf: "center", width: "100%" }}>
      <FlowBox
        title="gather-adapter（核心引擎）"
        subtitle=""
        titleColor={colors.neon}
        borderColor={colors.neon}
        bgColor="rgba(212,255,0,0.05)"
        delay={20}
      />
      <FlowArrow delay={28} />
      <FlowBox
        title="gather-adapter-ddos"
        subtitle=""
        titleColor={colors.magenta}
        borderColor={colors.magenta}
        delay={32}
      />
      <div style={{ color: colors.neon, fontSize: 28, textAlign: "center", padding: "4px 0", opacity: useReveal(38) }}>▼</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          width: "100%",
          maxWidth: 600,
          opacity: useReveal(42),
          transform: `translateY(${(1 - useReveal(42)) * 15}px)`,
        }}
      >
        {["TrafficCleanDeal", "CloudInnerBlackHoleDeal", "QingxiDeal", "AlarmDeal"].map((name) => (
          <div
            key={name}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "14px 20px",
              textAlign: "center",
              fontSize: 18,
              fontFamily: fontDisplay,
              fontWeight: 600,
              color: colors.cyan,
            }}
          >
            {name}
          </div>
        ))}
      </div>
      <p style={{ color: colors.muted, fontSize: 15, opacity: useReveal(50) }}>
        同时扩展: ResourceRich (DeviceRichImpl) · 定时任务 (IpStateCheckTask)
      </p>
    </div>
  </SlideFrame>
);

/* ================================================================
   P12 — TRAFFIC CLEAN FLOW
   ================================================================ */

const P12TrafficClean: React.FC = () => (
  <SlideFrame sectionNum="12" title="DDoS 实例：TrafficCleanDeal 业务流">
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 1100 }}>
      {[
        "Kafka 接收流量清洗汇总日志",
        <span>核心引擎解析 → 提取 <b>destIp</b>、<b>poolId</b>、<b>zoneName</b> 等字段</span>,
        "consumeAsync 触发: 去重判断 → 云网接口查用户ID → IP匹配",
        "发送短信/邮件通知 (MessageCenterService)",
        "保存清洗记录 + 通知历史",
      ].map((label, i) => (
        <PipelineStep key={i} n={i + 1} delay={20 + i * 8}>
          {label}
        </PipelineStep>
      ))}
    </div>
    <p style={{ color: colors.cyan, fontSize: 16, marginTop: 12, fontFamily: fontMono, opacity: useReveal(65) }}>
      getKey() → "log-189" 与采集规则中 LogRule 名称匹配
    </p>
  </SlideFrame>
);

/* ================================================================
   P13 — OTHER HANDLERS
   ================================================================ */

const P13OtherHandlers: React.FC = () => (
  <SlideFrame sectionNum="13" title="DDoS 实例：其他消息处理">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 1000 }}>
      {[
        { title: "CloudInnerBlackHoleDeal", desc: "云内黑洞事件处理" },
        { title: "QingxiDeal", desc: "清洗事件处理" },
        { title: "AlarmDeal", desc: "告警事件处理" },
        { title: "路由机制", desc: "每个 Deal 对应一种日志类型，通过 getKey() 自动路由" },
      ].map((c, i) => (
        <Card key={i} title={c.title} delay={20 + i * 8}>
          <p style={{ color: colors.muted, fontSize: 18 }}>{c.desc}</p>
        </Card>
      ))}
    </div>
  </SlideFrame>
);

/* ================================================================
   P14 — MANAGEMENT UI
   ================================================================ */

const P14ManageUI: React.FC = () => (
  <SlideFrame sectionNum="14" title="管理界面：功能总览">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 1100 }}>
      {[
        { title: "日志解析规则管理", desc: "CRUD + 导入导出 + 启停 + 字段配置 + 脚本测试" },
        { title: "服务采集规则管理", desc: "采集实例启停 + 在线匹配测试" },
        { title: "Kafka 配置管理", desc: "Topic / Offset 管理" },
        { title: "客户端管理", desc: "在线实例监控" },
      ].map((c, i) => (
        <Card key={i} title={c.title} delay={20 + i * 8}>
          <p style={{ color: colors.muted, fontSize: 18 }}>{c.desc}</p>
        </Card>
      ))}
    </div>
    <p style={{ color: colors.muted, fontSize: 15, marginTop: 16, opacity: useReveal(60) }}>
      gather-manage 通过 Feign 调用 gather-adapter 管理接口 · 前端: Vue3 + Element Plus + TypeScript
    </p>
  </SlideFrame>
);

/* ================================================================
   P15 — RULE CONFIG WORKFLOW
   ================================================================ */

const P15RuleWorkflow: React.FC = () => (
  <SlideFrame sectionNum="15" title="管理界面：规则配置工作流">
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 1100 }}>
      {[
        "配置 Kafka 源/目标连接",
        "创建日志解析规则（正则 + 字段 + 脚本）",
        "创建服务采集规则（关联 Kafka + 日志规则 + 匹配策略）",
        "启动采集实例（管理界面一键启停）",
        "在线匹配测试 (/serverrule/match/test) 验证规则正确性",
      ].map((label, i) => (
        <PipelineStep key={i} n={i + 1} delay={20 + i * 8}>
          {label}
        </PipelineStep>
      ))}
    </div>
    <p style={{ color: colors.cyan, fontSize: 16, marginTop: 16, opacity: useReveal(65) }}>
      支持 Excel 批量导入/导出
    </p>
  </SlideFrame>
);

/* ================================================================
   P16 — TECH HIGHLIGHTS
   ================================================================ */

const P16Highlights: React.FC = () => (
  <SlideFrame sectionNum="16" title="平台技术亮点总结">
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20,
        maxWidth: 1200,
      }}
    >
      {[
        { icon: "🔌", title: "多源接入", desc: "Kafka + Syslog 统一 LogServer 接口，工厂模式创建" },
        { icon: "📐", title: "规则驱动", desc: "ServerRule → LogRule → LogField 三层模型，正则/脚本灵活组合" },
        { icon: "🧩", title: "插件化扩展", desc: "CustomDeal + ResourceRich 双扩展点，OptionalFacade 路由" },
        { icon: "🔄", title: "热更新", desc: "规则变更不重启，ruleBoxSet 通知即生效" },
        { icon: "🖥", title: "可管理", desc: "完整前端管理界面，Excel 导入导出，在线规则测试" },
        { icon: "🔍", title: "可观测", desc: "调试日志开关、丢弃详情、队列溢出告警" },
      ].map((item, i) => {
        const reveal = useReveal(20 + i * 8);
        return (
          <div
            key={i}
            style={{
              textAlign: "center",
              padding: "24px 20px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 20}px)`,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 8 }}>{item.icon}</div>
            <h3 style={{ fontFamily: fontDisplay, fontSize: 24, color: colors.cyan, marginBottom: 6 }}>
              {item.title}
            </h3>
            <p style={{ color: colors.muted, fontSize: 15 }}>{item.desc}</p>
          </div>
        );
      })}
    </div>
  </SlideFrame>
);

/* ================================================================
   P17 — CLOSING
   ================================================================ */

const P17Closing: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `
        radial-gradient(ellipse at 50% 50%, rgba(0,102,255,0.25) 0%, transparent 70%),
        ${colors.bg}
      `,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 80,
    }}
  >
    <div style={{ ...halftoneStyle, opacity: 0.04 }} />
    <h2
      style={{
        fontFamily: fontDisplay,
        fontWeight: 800,
        fontSize: 64,
        color: colors.text,
        opacity: useReveal(10),
        transform: `translateY(${(1 - useReveal(10)) * 25}px)`,
      }}
    >
      总结与展望
    </h2>
    <div
      style={{
        width: 80,
        height: 4,
        background: colors.neon,
        margin: "20px auto",
        transform: `scaleX(${useReveal(20)})`,
      }}
    />
    <div
      style={{
        maxWidth: 800,
        opacity: useReveal(30),
        transform: `translateY(${(1 - useReveal(30)) * 20}px)`,
      }}
    >
      <p style={{ color: colors.cyan, fontFamily: fontDisplay, fontSize: 28, marginBottom: 12 }}>已支撑场景</p>
      <p style={{ color: colors.muted, fontSize: 22, marginBottom: 32 }}>DDoS 防护（流量清洗、黑洞、告警等）</p>
      <p style={{ color: colors.neon, fontFamily: fontDisplay, fontSize: 28, marginBottom: 12 }}>可扩展方向</p>
      <p style={{ color: colors.muted, fontSize: 22 }}>WAF 日志 · CDN 日志 · 业务审计日志 · 更多协议支持 (TCP/HTTP/gRPC)</p>
    </div>
    <p
      style={{
        fontSize: 44,
        fontFamily: fontDisplay,
        fontWeight: 700,
        marginTop: 56,
        color: colors.cyan,
        opacity: useReveal(50),
      }}
    >
      Thank You
    </p>
  </AbsoluteFill>
);

/* ================================================================
   MAIN COMPOSITION
   ================================================================ */

const SLIDE_COMPONENTS: React.FC[] = [
  P1Title,
  P2Problem,
  P3Modules,
  P4Arch,
  P5DualSource,
  P6Pipeline,
  P7Rules,
  P8LogField,
  P9Rich,
  P10Extend,
  P11DdosOverview,
  P12TrafficClean,
  P13OtherHandlers,
  P14ManageUI,
  P15RuleWorkflow,
  P16Highlights,
  P17Closing,
];

const timing = linearTiming({ durationInFrames: TRANSITION_DURATION });
const transition = fade();

export const LogGatherVideo: React.FC = () => (
  <TransitionSeries>
    {SLIDE_COMPONENTS.map((Slide, i) => (
      <React.Fragment key={i}>
        <TransitionSeries.Sequence durationInFrames={SLIDE_DURATION}>
          <Slide />
        </TransitionSeries.Sequence>
        {i < SLIDE_COMPONENTS.length - 1 && (
          <TransitionSeries.Transition presentation={transition} timing={timing} />
        )}
      </React.Fragment>
    ))}
  </TransitionSeries>
);
