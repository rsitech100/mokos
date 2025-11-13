const contentData = [
      "Lorem ipsum dolor sit amet consectetur. Auctor porttitor massa proin urna placerat lacinia ipsum. Nibh faucibus hac diam purus fusce consectetur posuere. Proin praesent gravida nunc ac morbi ridiculus eget nibh. Habitant in nullam morbi faucibus ultrices risus sit et nibh. Tristique quis netus nisl dictumst velit sit at netus adipiscing. Nibh nisi hac scelerisque neque felis aliquam dui scelerisque. Mi est massa quisque aliquet ipsum ultrices id interdum. Molestie convallis feugiat et nec senectus at feugiat sit. Orci nullam ut eget a senectus.",
      "Lorem ipsum dolor sit amet consectetur. Auctor porttitor massa proin urna placerat lacinia ipsum. Nibh faucibus hac diam purus fusce consectetur posuere. Proin praesent gravida nunc ac morbi ridiculus eget nibh. Habitant in nullam morbi faucibus ultrices risus sit et nibh. Tristique quis netus nisl dictumst velit sit at netus adipiscing. Nibh nisi hac scelerisque neque felis aliquam dui scelerisque. Mi est massa quisque aliquet ipsum ultrices id interdum. Molestie convallis feugiat et nec senectus at feugiat sit. Orci nullam ut eget a senectus.",
      "Lorem ipsum dolor sit amet consectetur. Auctor porttitor massa proin urna placerat lacinia ipsum. Nibh faucibus hac diam purus fusce consectetur posuere. Proin praesent gravida nunc ac morbi ridiculus eget nibh. Habitant in nullam morbi faucibus ultrices risus sit et nibh. Tristique quis netus nisl dictumst velit sit at netus adipiscing. Nibh nisi hac scelerisque neque felis aliquam dui scelerisque. Mi est massa quisque aliquet ipsum ultrices id interdum. Molestie convallis feugiat et nec senectus at feugiat sit. Orci nullam ut eget a senectus.",
      "Lorem ipsum dolor sit amet consectetur. Auctor porttitor massa proin urna placerat lacinia ipsum. Nibh faucibus hac diam purus fusce consectetur posuere. Proin praesent gravida nunc ac morbi ridiculus eget nibh. Habitant in nullam morbi faucibus ultrices risus sit et nibh. Tristique quis netus nisl dictumst velit sit at netus adipiscing. Nibh nisi hac scelerisque neque felis aliquam dui scelerisque. Mi est massa quisque aliquet ipsum ultrices id interdum. Molestie convallis feugiat et nec senectus at feugiat sit. Orci nullam ut eget a senectus."
];

export function ContentTos() {
      return (
            <div className="flex flex-col gap-6">
                  <h2 className="font-extrabold text-lg md:text-2xl text-neutral-700">Syarat dan Ketentuan</h2>
                  {contentData.map((paragraph, index) => (
                        <p key={index} className="text-xs md:text-sm text-neutral-700">
                              {paragraph}
                        </p>
                  ))}
            </div>
      );
}
