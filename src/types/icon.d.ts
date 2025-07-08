type Icon = import("react").ForwardRefExoticComponent<
    Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>
  >