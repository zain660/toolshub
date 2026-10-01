import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  className?: string;
}

export default function DynamicIcon({ name, size = 20, className = '', ...props }: DynamicIconProps) {
  // @ts-ignore
  const IconComponent = LucideIcons[name] || LucideIcons.Wrench || LucideIcons.HelpCircle;
  return <IconComponent size={size} className={className} {...props} />;
}
