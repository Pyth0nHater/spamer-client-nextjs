const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Sessions', href: '#', current: false },
  { name: 'Mailing', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
];

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NavigationBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-stone-900 text-white">
      <div className="flex h-16 mb-2 items-center justify-center">
        <div className="flex space-x-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
